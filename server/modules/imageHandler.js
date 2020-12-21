const pool = require("../modules/pool");
const fs = require("fs-extra");
const AWS = require("aws-sdk");

const BUCKET_NAME = process.env.BUCKET_NAME;
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

const verbose = false; //turns on and off console.logs

const uploadPost = async (req, res) => {
  verbose && console.log("--------upload--------->", req.files);
  let picture = await uploadToS3(req.files, res);
  uploadToSQL(req, picture, res);
};

const generateSignedUrls = async (res, rows) => {
  const newRows = await addSignedUrls(rows);
   verbose && console.log({ newRows });
  res.send(newRows);
};

const addSignedUrls = async (rows) => {
  const newRows = [];

  for (const row of rows) {
    const media_url = await generateSignedUrl(row.image);
    row.media_url = media_url;
    newRows.push(row);
  }
  return new Promise((resolve) => {
    resolve(newRows);
  });
};

function generateSignedUrl(key) {
  return new Promise((revolve) => {
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME,
      signatureVersion: "v4",
      region: "us-west-1",
    });
    let urls = [];

    key === null ? "":  key.map((key) => {
      verbose && console.log("------key------->", key);
      let urlParams = { Bucket: BUCKET_NAME, Key: key };
      s3bucket.getSignedUrl("getObject", urlParams, function (error, url) {
        if (error) {
          verbose && console.log("err", error);
        } else {
          // verbose && console.log("url in getsigned response: ", url);
        }
        verbose && console.log(url, error);
        urls.push(url);
        revolve(urls);
      });
    });
  });
}

function uploadToS3(file, res) {
  verbose && console.log("--------uploadS3--------->", file);

  return new Promise((resolve) => {
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME,
      signatureVersion: "v4",
      region: "us-west-1",
    });

    let files = [];

    for (let i in file) {
      console.log(i);
      fs.readFile(file[i].path)
        .then((data) => {
          verbose && console.log(`file read: `, data);
          verbose && console.log("----> data", data);
          s3bucket.createBucket(function () {
            var params = {
              Bucket: BUCKET_NAME,
              Key: file[i].filename,
              Body: data,
            };
            s3bucket.upload(params, function (error, data) {
              if (error) {
                res.sendStatus(500);
              }
              files.push(data.Key);
              setTimeout(() => {
                resolve(files);
              }, 500);
              console.log(files);
            });
          });
        })
        .catch((error) => {
          console.log(error);
          res.sendStatus(500);
        });
    }
  });
}

function uploadToSQL(req, picture, res) {
  let text = req.body.text;
  let time = req.body.time;
  let postOwnerId = req.user.id;
  console.log("post", picture, text, time);

  return new Promise((resolve) => {
    const queryText = `INSERT INTO "posts" (content,image, time, post_owner_id) VALUES ($1,$2,$3,$4)`;

    pool
      .query(queryText, [text, picture, time, postOwnerId])
      .then((result) => {
        // verbose && console.log("back from db with:", result);
        res.sendStatus(200);
      })
      .catch((error) => {
        verbose && console.log("error in POST", error);
        res.sendStatus(500);
      });
  });
}

module.exports = { uploadPost, generateSignedUrls };

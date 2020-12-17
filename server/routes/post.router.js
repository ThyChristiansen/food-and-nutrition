const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const moment = require("moment");

//-----------------Post-----------------
router.get("/", (req, res) => {
  const queryText = `SELECT  "user".name, p.*, u.users_who_liked_array, like_id
  FROM   posts      p
  LEFT JOIN  ( 
     SELECT pu.post_id AS id, array_agg(u.name) AS users_who_liked_array, array_agg(pu.id) AS like_id
     FROM   likes pu
     JOIN   "user"       u  ON u.id = pu.users_who_liked
     GROUP  BY pu.post_id
     ) u USING (id)
  JOIN "user" 
  ON p.post_owner_id = "user".id
  ORDER BY p.id
  ;
  `;
  pool
    .query(queryText)
    .then((result) => {
      // console.table(result.rows);
      res.send(result.rows);
    })
    .catch((error) => console.log(error));
});

router.post("/", (req, res) => {
  let text = req.body.text;
  let time = req.body.time;
  let postOwnerId = req.user.id;

  const queryText =
    'INSERT INTO "posts" (content, time, post_owner_id) VALUES ($1, $2, $3)';
  pool
    .query(queryText, [text, time, postOwnerId])
    .then(() => res.sendStatus(201))
    .catch((error) => console.log(error));
});

router.put("/", (req, res) => {
  console.log(req.body);
  let content = req.body.content;
  let id = req.body.id;

  const queryText = `UPDATE "posts" SET content = $1 WHERE id = $2;`;
  pool
    .query(queryText, [content, id])
    .then(() => res.sendStatus(201))
    .catch((error) => console.log(error));
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  const queryText = `DELETE FROM "posts" WHERE id = $1;`;
  pool
    .query(queryText, [id])
    .then(() => res.sendStatus(201))
    .catch((error) => console.log(error));
});
//-----------------Post-----------------

//-----------------Like-----------------

router.post("/like", (req, res) => {
  let post_id = req.body.id;
  let userWhoLiked = req.body.userWhoLiked;

  console.log(post_id, userWhoLiked);
  const queryText =
    'INSERT INTO "likes" (post_id, users_who_liked) VALUES ($1, $2)';
  pool
    .query(queryText, [post_id, userWhoLiked])
    .then(() => res.sendStatus(201))
    .catch((error) => console.log(error));
});

router.delete("/like/:post_id/:user_id", (req, res) => {
  let postId = req.params.post_id;
  let userWhoLiked = req.params.user_id;
  const queryText = `DELETE FROM "likes" WHERE post_id = $1 AND users_who_liked = $2;`;
  pool
    .query(queryText, [postId, userWhoLiked])
    .then(() => res.sendStatus(201))
    .catch((error) => console.log(error));
});
//-----------------Like-----------------

//-----------------Comment-----------------
router.post("/comment", (req, res) => {
  let post_id = req.body.id;
  let userWhoCommentedId = req.body.userWhoCommentedId;
  let content = req.body.contentComment;
  let time = req.body.time;

  const queryText =
    'INSERT INTO "comments" (post_id, users_who_commented_id, content, time) VALUES ($1, $2, $3, $4)';
  pool
    .query(queryText, [post_id, userWhoCommentedId, content, time])
    .then(() => res.sendStatus(201))
    .catch((error) => console.log(error));
});

router.get("/comment/:id", (req, res) => {
  postId = req.params.id;
  console.log("---->",postId);
  const queryText = `
  SELECT posts.*, comments.*, "user".name
  FROM posts
  JOIN comments 
  ON posts.id = comments.post_id
  JOIN "user" 
  ON "user".id = comments.users_who_commented_id
  WHERE posts.id = $1
  ORDER BY comments.id
  ;
  `;
  pool
    .query(queryText, [postId])
    .then((result) => {
      console.table(result.rows);
      res.send(result.rows);
    })
    .catch((error) => console.log(error));
});
//-----------------Comment-----------------

module.exports = router;

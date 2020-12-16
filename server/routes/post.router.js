const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const moment = require("moment");

router.get("/", (req, res) => {
  const queryText = `SELECT posts.id, user_id, content, image, time, count_like, comment_id, email, name from posts INNER JOIN "user" ON posts.user_id = "user".id; `;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => console.log(error));
});

router.post("/", (req, res) => {
  let text = req.body.text;
  let time = req.body.time;
  let user_id = req.user.id;

  const queryText =
    'INSERT INTO "posts" (content, time, user_id) VALUES ($1, $2, $3)';
  pool
    .query(queryText, [text, time, user_id])
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
  console.log(id)
  const queryText = `DELETE FROM "posts" WHERE id = $1;`;
  pool
    .query(queryText, [id])
    .then(() => res.sendStatus(201))
    .catch((error) => console.log(error));
});

module.exports = router;

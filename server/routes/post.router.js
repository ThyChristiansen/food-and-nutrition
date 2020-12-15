const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require("moment");

router.get('/', (req, res) => { 
  const queryText = `SELECT * from POSTS INNER JOIN "user" ON posts.user_id = "user".id; `;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) =>
      console.log(error)
    );
});




router.post('/', (req, res) => {
    let text = req.body.text;
    let time = req.body.time
    let user_id = req.user.id
  
    const queryText = 'INSERT INTO "posts" (content, time, user_id) VALUES ($1, $2, $3)';
    pool.query(queryText, [ text, time, user_id])
      .then(() => res.sendStatus(201))
      .catch((error) =>
        console.log(error)
      );
  });
  

  
  module.exports = router;
  




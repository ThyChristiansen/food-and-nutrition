const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require("moment");

router.get('/', (req, res) => { 
  const queryText = `SELECT * from POSTS INNER JOIN "user" ON posts.user_id = "user".id; `;
  pool.query(queryText)
    .then((result) => {
      console.log('------>', result.rows)
      res.send(result.rows);
    })
    .catch((error) =>
      console.log(error)
    );
});


module.exports = router;

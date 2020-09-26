const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// router.get('/', rejectUnauthenticated, (req, res) => {
//   res.send(req.user);
// });


router.post('/', (req, res) => {
  console.log(req.body.item.summary)
  let id = req.body.item.id
  let title = req.body.item.title
  let image = req.body.item.image
  let summary = req.body.item.summary

  const queryText = 'INSERT INTO "favorite_list" (recipe_id, meal_title, image,summary) VALUES ($1, $2, $3, $4)';
  pool.query(queryText, [id, title, image, summary])
    .then(() => res.sendStatus(201))
    .catch((error) =>
      console.log(error)
    );
});


module.exports = router;

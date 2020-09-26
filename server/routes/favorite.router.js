const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "favorite_list";`;
  pool.query(queryText)
    .then((result) => {
      console.log('------>', result.rows)
      res.send(result.rows);
    })
    .catch((error) =>
      console.log(error)
    );
});


router.post('/', (req, res) => {
  console.log(req.body.item.summary)
  let id = req.body.item.id
  let title = req.body.item.title
  let image = req.body.item.image
  let summary = req.body.item.summary

  const queryText = 'INSERT INTO "favorite_list" (recipe_id, title, image,summary) VALUES ($1, $2, $3, $4)';
  pool.query(queryText, [id, title, image, summary])
    .then(() => res.sendStatus(201))
    .catch((error) =>
      console.log(error)
    );
});

router.delete('/:id', (req, res) => {
  let itemId = req.params.id;
  console.log('Delete request for this id: ', itemId);
  let sqlText = `DELETE FROM favorite_list WHERE id = $1`;
  pool.query(sqlText, [itemId])
      .then(result => {
          console.log('DELETE this item by id:', itemId)
          res.sendStatus(200);
      }).catch(err => {
          console.log('Error in DELETE route', err);
          res.sendStatus(500);
      })
})

module.exports = router;

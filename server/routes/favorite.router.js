const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  let user_id = req.user.id;
  const queryText = `SELECT * FROM "favorite_list" WHERE user_id = $1 ORDER BY id;`;
  pool.query(queryText, [user_id])
    .then((result) => {
      // console.log('------>', result.rows)
      res.send(result.rows);
    })
    .catch((error) =>
      console.log(error)
    );
});

router.get('/tried', (req, res) => {
  let user_id = req.user.id;
  const queryText = `SELECT * FROM "tried_list" WHERE user_id = $1 ORDER BY id;`;
  pool.query(queryText, [user_id])
    .then((result) => {
      // console.log('------>', result.rows)
      res.send(result.rows);
    })
    .catch((error) =>
      console.log(error)
    );
});

router.post('/', (req, res) => {
  console.log(req.body.item.summary)
  let user_id = req.user.id;
  let id = req.body.item.id
  let title = req.body.item.title
  let image = req.body.item.image
  let summary = req.body.item.summary

  const queryText = 'INSERT INTO "favorite_list" (user_id, recipe_id, meal_title, image,summary) VALUES ($1, $2, $3, $4, $5)';
  pool.query(queryText, [user_id, id, title, image, summary])
    .then(() => res.sendStatus(201))
    .catch((error) =>
      console.log(error)
    );
});

router.delete('/delete-out-off-list/:id', (req, res) => {
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

router.post('/drop-to-tried-list', (req, res) => {
  console.log(req.body)
  let id = req.body.id;

  const queryText = `
  INSERT INTO tried_list (user_id, recipe_id, title, image, summary)
  SELECT user_id, recipe_id, title, image, summary
  FROM favorite_list
  WHERE id = $1;
  `;
  pool.query(queryText, [id])
    .then(() => res.sendStatus(201))
    .catch((error) =>
      console.log(error)
    );

});

router.post('/drop-to-favorite-list', (req, res) => {
  console.log(req.body)
  let id = req.body.id;

  const queryText = `
  INSERT INTO favorite_list (user_id, recipe_id, title, image, summary)
  SELECT user_id, recipe_id, title, image, summary
  FROM tried_list
  WHERE id = $1;
  DELETE FROM favorite_list
  WHERE id = $1;
  `;
  pool.query(queryText, [id])
    .then(() => res.sendStatus(201))
    .catch((error) =>
      console.log(error)
    );
});


module.exports = router;

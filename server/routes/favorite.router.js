const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

let getRoute = (address, tableName)=>{
  router.get(`${address}`, (req, res) => {
    let user_id = req.user.id;
    const queryText = `SELECT * FROM ${tableName} WHERE user_id = $1 ORDER BY id;`;
    pool.query(queryText, [user_id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) =>
        console.log(error)
      );
  });
}
getRoute('/', 'favorite_list');
getRoute('/tried', 'tried_list');

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

router.delete('/delete-out-off-list/:itemId/:droppableId', (req, res) => {
  let itemId = req.params.itemId;
  let droppableId = req.params.droppableId;
  console.log('Delete request for this id: ', itemId, 'and', droppableId);
  let sqlText;
  if (droppableId === "favoriteList") {
    sqlText = `DELETE FROM favorite_list WHERE id = $1`;
  } else {
    sqlText = `DELETE FROM tried_list WHERE id = $1`;
  }
  pool.query(sqlText, [itemId])
    .then(result => {
      console.log('DELETE this item by id:', itemId)
      res.sendStatus(200);
    }).catch(err => {
      console.log('Error in DELETE route', err);
      res.sendStatus(500);
    })

})


let insertRecipeToOtherTableAfterDrop = (address,firstTableName, secondTableName)=>{
  router.post(`${address}`, (req, res) => {
    console.log(req.body)
    let id = req.body.id;
  
    const queryText = `
    INSERT INTO ${firstTableName} (user_id, recipe_id, title, image, summary)
    SELECT user_id, recipe_id, title, image, summary
    FROM ${secondTableName}
    WHERE id = $1;
    `;
    // DELETE FROM favorite_list
    // WHERE id = $1;
    pool.query(queryText, [id])
      .then(() => res.sendStatus(201))
      .catch((error) =>
        console.log(error)
      );
  });
};
insertRecipeToOtherTableAfterDrop("/drop-to-favorite-list", "favorite_list", "tried_list")
insertRecipeToOtherTableAfterDrop("/drop-to-tried-list", "tried_list", "favorite_list")


function moveRecipeToOtherList(address,tableName){
  router.delete(`/${address}/:id`, (req, res) => {
    let id = req.params.id;
    console.log(`from ${address} `,req.params, id)
    const queryText = `
    DELETE FROM ${tableName}
    WHERE id = $1;
    `;
    pool.query(queryText, [id])
      .then(() => res.sendStatus(201))
      .catch((error) =>
        console.log(error)
      );
  })
}
moveRecipeToOtherList("favorite-recipe-deleted-after-drag", "favorite_list")
moveRecipeToOtherList("tried-recipe-deleted-after-drag", "tried_list")


module.exports = router;

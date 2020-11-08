const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/1/:date', (req, res) => {
    const date = req.params.date;
    const userId = req.user.id
    console.log(date)
    const queryText = `SELECT * FROM "meal_plan" WHERE user_id = $1 AND date = $2 ORDER BY meal_type ASC;`;
    pool.query(queryText, [userId, date])
        .then((result) => {
            console.log('------>', result.rows)
            res.send(result.rows);
        })
        .catch((error) =>
            console.log(error)
        );
});

router.get('/allMealPlan', (req, res) => {
    const userId = req.user.id

    const queryText = `SELECT * FROM "meal_plan"  WHERE user_id = $1 ORDER BY meal_type ASC;`;
    pool.query(queryText, [userId])
        .then((result) => {
            console.log('---------------->', result.rows)
            res.send(result.rows);
        })
        .catch((error) =>
            console.log(error)
        );
});

router.post('/', (req, res) => {
    const mealTitle = req.body.mealTitle
    const mealType = req.body.mealType
    const mealDescription = req.body.mealDescription
    const selectedDate = req.body.date
    const userId = req.user.id

    console.log('--------->', mealTitle, mealType, mealDescription, selectedDate);

    const queryText = 'INSERT INTO "meal_plan" (user_id,meal_title,meal_type,meal_description,date) VALUES ($1, $2, $3, $4, $5) RETURNING id';
    pool.query(queryText, [userId, mealTitle, mealType, mealDescription, selectedDate])
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
});

router.post('/addRecipe', (req, res) => {
    const mealTitle = req.body.item.title
    const mealType = req.body.mealType
    const mealDescription = req.body.item.image
    const date = req.body.date
    const recipeId = req.body.item.id
    const userId = req.user.id

    console.log('--------->', mealTitle, mealType, mealDescription, date, recipeId);

    const queryText = 'INSERT INTO "meal_plan" (user_id, meal_title,meal_type,meal_description,date,recipe_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
    pool.query(queryText, [userId, mealTitle, mealType, mealDescription, date, recipeId])
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
});

router.put('/', (req, res) => {
    const mealTitle = req.body.mealTitle
    const mealDescription = req.body.mealDescription
    const id = req.body.id

    console.log('---------update>', mealTitle, mealDescription);

    const queryText = `UPDATE "meal_plan" SET meal_title = $1, meal_description = $2 WHERE id = $3 ;`;
    pool.query(queryText, [mealTitle, mealDescription, id])
        .then(() => res.sendStatus(201))
        .catch((error) => {
            console.log(error);
            res.sendStatus(500)
        }
        );
});





module.exports = router;
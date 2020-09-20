const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// router.get('/', (req, res) => {
//     res.sendStatus(200); // For testing only, can be removed
// });

router.post('/', (req, res) => {
    const mealTitle = req.body.mealTitle
    const mealType = req.body.mealType
    const mealDescription = req.body.mealDescription
    // console.log('--------->', mealTitle, mealType, mealDescription);

    const queryText = 'INSERT INTO "mealPlan" (meal_title,meal_type,meal_description) VALUES ($1, $2, $3) RETURNING id';
    pool.query(queryText, [mealTitle, mealType,mealDescription])
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
});



module.exports = router;
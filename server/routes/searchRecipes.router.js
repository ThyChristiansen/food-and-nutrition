const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

let key = process.env.REACT_APP_API_RECIPE


router.get('/:input/:typeMeal/:minCalories/:maxCalories/:minFat/:maxFat/:minProtein/:maxProtein/:intolerances', (req, res) => {
  input = req.params.input;
  type = req.params.typeMeal;
  cuisine = req.params.cuisine;
  minCalories = req.params.minCalories;
  maxCalories = req.params.maxCalories;
  minFat = req.params.minFat;
  maxFat = req.params.maxFat;
  minProtein = req.params.minProtein;
  maxProtein = req.params.maxProtein;

  console.log('----->', input, type, minCalories, maxCalories, minFat, maxFat, minProtein, maxProtein)

  const config = {
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": key,
      "useQueryString": true
    },
    params: {
      "number": "10",
      "query": input,
      "limitLicense": "false",
      "offset": "0",
      "type": type,
      "minCalories": minCalories,
      "maxCalories": maxCalories,
      "minFat": minFat,
      "maxFat": maxFat,
      "minProtein": minProtein,
      "maxProtein": maxProtein,
    }
  }

  axios.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex", config)
    .then(result => {
      console.log('recipes data', result.data);
      res.send(result.data)
    }).catch(err => {
      console.log('Error from get recipes title', err);
      res.sendStatus(500);
    })
});

module.exports = router;

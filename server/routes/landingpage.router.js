const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

let key = process.env.REACT_APP_API_RECIPE


router.get('/:question', (req, res) => {
  const question = req.params.question
  console.log('question from router',question);
  const config = {
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": key,
      "useQueryString": true
    },
    params: {
      "q": question
    }
  }
  axios.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/quickAnswer", config)
    .then(result => {
      console.log('data', result.data);
      res.send(result.data)
    }).catch(err => {
      console.log('Error from get answer',err);
      res.sendStatus(500);
    })
})

module.exports = router;
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require("moment");

router.get('/general-payment/:date', (req, res) => {
  
  let user_id = req.user.id;
  let month = moment(req.params.date).format("MM");
  let year = moment(req.params.date).format("YYYY");
  const queryText = `SELECT * FROM payment WHERE EXTRACT(YEAR FROM date) = $1 AND EXTRACT(MONTH FROM date) = $2 AND user_id = $3; `;
  pool.query(queryText, [year, month, user_id])
    .then((result) => {
      // console.log('------>', result.rows)
      res.send(result.rows);
    })
    .catch((error) =>
      console.log(error)
    );

});

router.post('/', (req, res) => {
  let amount = req.body.amount;
  let note = req.body.note;
  let date = req.body.date;
  let user_id = req.user.id

  const queryText = 'INSERT INTO "payment" (amount, note, date, user_id) VALUES ($1, $2, $3, $4)';
  pool.query(queryText, [amount, note, date, user_id])
    .then(() => res.sendStatus(201))
    .catch((error) =>
      console.log(error)
    );
});

router.put('/', (req, res) => {
  let amount = req.body.amount;
  let note = req.body.note;
  let id = req.body.id;
  console.log(amount, note, id)

  const queryText = `UPDATE "payment" SET amount = $1, note = $2 WHERE id = $3;`;
  pool.query(queryText, [amount, note, id])
    .then(() => res.sendStatus(201))
    .catch((error) =>
      console.log(error)
    );
});

router.get('/totalPayment/:year', (req, res) => {
  let user_id = req.user.id;
  let year = req.params.year
  console.log(year)
  const queryText = `SELECT EXTRACT(MONTH FROM date) as "month", sum(amount) as total_amount
  from payment
  where user_id= $1 AND EXTRACT(YEAR FROM date) = $2
  group by EXTRACT(MONTH FROM date) ORDER BY EXTRACT(MONTH FROM date); `;
  pool.query(queryText, [user_id, year])
    .then((result) => {
      console.log('------>', result.rows)
      res.send(result.rows);
    })
    .catch((error) =>
      console.log(error)
    );

});
module.exports = router;

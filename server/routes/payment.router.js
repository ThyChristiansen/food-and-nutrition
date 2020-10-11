const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/general-payment/:month', (req, res) => {
  let user_id = req.user.id;
  let month = req.params.month;
  const queryText = `SELECT *,(SELECT SUM(amount) FROM payment WHERE EXTRACT(MONTH FROM date) = $1 AND user_id = $2 GROUP BY user_id ) AS total_month
  FROM payment WHERE EXTRACT(MONTH FROM date) = $1 AND user_id = $2; `;
  pool.query(queryText, [month, user_id])
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

router.get('/totalPayment', (req, res) => {
  let user_id = req.user.id;
  const queryText = `SELECT EXTRACT(MONTH FROM date) as "month", sum(amount) as total_amount
  from payment
  where user_id= $1
  group by EXTRACT(MONTH FROM date) ORDER BY EXTRACT(MONTH FROM date); `;
  pool.query(queryText, [user_id])
    .then((result) => {
      // console.log('------>', result.rows)
      res.send(result.rows);
    })
    .catch((error) =>
      console.log(error)
    );

});
module.exports = router;

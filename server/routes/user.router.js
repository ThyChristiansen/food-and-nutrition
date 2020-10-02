const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  res.send(req.user);
});


router.post('/register', (req, res, next) => {
  const username = req.body.email;
  const name = req.body.name;
  const password = encryptLib.encryptPassword(req.body.password);
  console.log(req.body)
  const queryText = 'INSERT INTO "user" (username, password, name ) VALUES ($1, $2, $3) RETURNING id';
  pool.query(queryText, [username, password, name])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});


router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
  console.log(req.body)
});

router.post('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;

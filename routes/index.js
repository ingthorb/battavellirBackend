var express = require('express');
var router = express.Router();

const { Pool } = require('pg');
const pool = new Pool();

/* GET All regions */
router.get('/regions', function(req, res, next) {
  pool.query('SELECT countrypart AS "Region" FROM region ORDER BY countrypart ASC', (err, resp) => {
    if(err) {
      console.log(err.message);
      res.status(err.status);
    }
    else {
      res.status(200);
      res.send(resp.rows);
    }
  })
});

/* GET All Towns */
router.get('/towns', function(req, res, next) {
  pool.query('SELECT * FROM towns ORDER BY countrypart ASC', (err, resp) => {
    if(err) {
      console.log(err.message);
      res.status(err.status);
    }
    else {
      res.status(200);
      res.send(resp.rows);
    }
  })
});

/* GET All fields */
router.get('/fields', function(req, res, next) {
  pool.query('SELECT * FROM fields ORDER BY cityname ASC', (err, resp) => {
    if(err) {
      console.log(err.message);
      res.status(err.status);
    }
    else {
      res.status(200);
      res.send(resp.rows);
    }
  })
});

/* POST region */
/*router.post('/regions', function(req, res, next) {
  console.log(req.body.countrypart);
  pool.query('SELECT countrypart WHERE countrypart = $1 FROM region ORDER BY countrypart ASC', [req.body.countrypart], (err, resp) => {
    if(err) {
      console.log(err.message);
      res.status(err.status);
    }
    else {
      res.status(200);
      res.send(resp.rows);
    }
  })
});
*/
/* POST Town */
/*router.post('/towns', function(req, res, next) {
  pool.query('SELECT * FROM towns ORDER BY countrypart ASC', (err, resp) => {
    if(err) {
      console.log(err.message);
      res.status(err.status);
    }
    else {
      res.status(200);
      res.send(resp.rows);
    }
  })
});*/

/* POST field */
/*router.post('/fields', function(req, res, next) {
  pool.query('SELECT * FROM fields ORDER BY cityname ASC', (err, resp) => {
    if(err) {
      console.log(err.message);
      res.status(err.status);
    }
    else {
      res.status(200);
      res.send(resp.rows);
    }
  })
});
*/

module.exports = router;
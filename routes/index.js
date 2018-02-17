var express = require('express');
var router = express.Router();

const { Pool } = require('pg');
const pool = new Pool();
var contentType = "application/json";
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

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
  });
});

/* POST region */
router.post('/regions', function(req, res, next) {
  if(req.get('Content-Type') !== contentType)
  {
    res.statusCode = 415;
    return res.json("Unsupported Media Type");
  }

  if(req.body.countrypart == undefined)
  {
    res.status(400);
    res.send("Not correct format, specify countrypart");
  }

  pool.query('SELECT countrypart FROM region WHERE countrypart = $1', [req.body.countrypart], (err, resp) => {
    if(resp) {
      if(resp.rows.length !== 0)
      {
        res.status(400);
        res.send("Duplicate entry in database");
      }
      else {
        pool.query('INSERT INTO region(countrypart) VALUES($1)', [req.body.countrypart], (err, resp) => {
          if(err) {
            console.log(err.message);
            res.status(err.status);
          }
          else {
            res.status(201);
            res.send(resp.rows);
          }
        });
      }
    }
    else {
      res.status(201);
      res.send(resp.rows);
      }
  });
});

/* POST Town */
router.post('/towns', function(req, res, next) {
  console.log(req.body.cityname);
  console.log(req.body.countrypart);
  if(req.get('Content-Type') !== contentType)
  {
    res.statusCode = 415;
    return res.json("Unsupported Media Type");
  }

  if(req.body.cityname == undefined || req.body.countrypart == undefined)
  {
    res.status(400);
    res.send("Not correct format, specify countrypart and cityname");
  }

  pool.query('SELECT cityname FROM towns WHERE countrypart = $1 cityname = $2', [req.body.countrypart, req.body.cityname], (err, resp) => {
    if(resp) {
      if(resp.rows.length !== 0)
      {
        res.status(400);
        res.send("Duplicate entry in database");
      }
      else {
        pool.query('INSERT INTO towns(countrypart,cityname) VALUES($1, $2)', [req.body.countrypart, req.body.cityname], (err, resp) => {
          if(err) {
            console.log(err.message);
            res.status(err.status);
          }
          else {
            res.status(201);
            res.send(resp.rows);
          }
        });
      }
    }
    else {
      console.log(err.message);
      res.status(err.status);
    }
  });
});

/* POST field */
router.post('/fields', function(req, res, next) {
  if(req.get('Content-Type') !== contentType)
  {
    res.statusCode = 415;
    return res.json("Unsupported Media Type");
  }

  if(req.body.lat == undefined || req.body.countrypart == undefined || req.body.lng == undefined || req.body.photos == undefined || req.body.rating == undefined)
  {
    res.status(400);
    res.send("Not correct format, specify countrypart, lat, lng, photo and rating");
  }

  pool.query('SELECT cityname FROM fields WHERE lat = $1 AND cityname = $2', [req.body.lat, req.body.cityname], (err, resp) => {
    if(resp) {
      console.log(resp);
      if(resp.rows.length !== 0)
      {
        res.status(400);
        res.send("Duplicate entry in database");
      }
      else {
        pool.query('INSERT INTO fields(cityname, lat, lng, photos, rating) VALUES($1, $2, $3, $4, $5)', [req.body.cityname, req.body.lat, req.body.lng, req.body.photos, req.body.rating], (err, resp) => {
          if(err) {
            console.log(err.message);
            res.status(err.status);
          }
          else {
            res.status(201);
            res.send(resp.rows);
          }
        });
      }
    }
    else {
      console.log(err.message);
      res.status(err.status);
    }
  });
});


module.exports = router;

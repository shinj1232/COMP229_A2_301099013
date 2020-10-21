//Hyunjune Shin 301099013 2020-10-20
//routing for user page

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('PLACEHOLDER');
});

module.exports = router;

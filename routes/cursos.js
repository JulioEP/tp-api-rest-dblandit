var express = require('express');
var router = express.Router();

/* GET cursos listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a cursos');
});

module.exports = router;

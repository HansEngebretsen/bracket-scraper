var express = require('express');
var router = express.Router();
var cacheData = require('../modules/cachedata.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  cacheData(renderPage);
  function renderPage(bracketData){
    res.render('index', {
      title: 'Madness Brackets',
      rs: require('fs'),
      data: bracketData
    });
  }
});

module.exports = router;

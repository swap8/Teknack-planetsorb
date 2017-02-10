var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _ = require('underscore');
var User = require('../models/User');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;

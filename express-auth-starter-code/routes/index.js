var express = require('express');
var db = require('../db');

var router = express.Router();

// get the index page
router.get('/index', function(req, res, next) {
    res.locals.filter = null;
    res.render('index');
});

router.get('/', function(req, res, next) {
    if (!req.user) {
        return res.render('home');
    }
    next;
    }, function(req, res, next) {
        res.locals.filter = null;
        res.render('index', {user : req.user});
    }
);


module.exports = router; 
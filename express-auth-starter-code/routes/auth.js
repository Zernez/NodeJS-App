var express = require ('express');
var router = express.Router();
var passport = require ('passport');
var localStrategy = require ('passport-local').Strategy;
var crypto = require ('crypto');
var db = require ('../db');

passport.use (new localStrategy (function verify (username, password, cb) {
    db.get ('SELECT * FROM users WHERE username = ?', [username], function (err, row) {
        if (err) {
            return cb (err);
        }
        if (!row) {
            return cb (null, false, {message: 'Incorrect username or password!'}); 
        }
        
    var hash = crypto.pbkdf2Sync (password, row.salt, 310000, 32, 'sha256');
        if (!crypto.timingSafeEqual (hash, row.hashed_password)) {
            return cb (null, false, {message: 'Incorrect passowrd.'});
        }
        return cb (null, row);
    });
}));

passport.serializeUser (function (user, cb) {
    process.nextTick (function () {
        return cb (null, {id: user.id, username: user.username, name: user.name});
    });
});

passport.deserializeUser (function (user, cb) {
    process.nextTick (function () {
        return cb (null, user);
    });
});

router.get ('/login', function (req, res, next) { 
    res.render ('login');
}); 

router.post ('/login/password', passport.authenticate ('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.post ('/logout', function (req, res, next) { 
    req.logout(function (err){
        if (err) {
            return next (err);
        }
        req.session.destroy();
        res.redirect ('/');  
    });
});

router.get ('/signup', function (req, res, next) { 
    res.render ('signup');
}); 

router.post ('/signup', function (req, res, next) {
    var salt = crypto.randomBytes (16);
    
    crypto.pbkdf2 (req.body.password, salt, 310000, 32, 'sha256', function (err, hashed_password) {
        if (err) {
            return next (err);
        }

        db.run ('INSERT INTO users (username, salt, hashed_password) VALUES (?, ?, ?)', 
            [req.body.username, salt, hashed_password], 
            function (err) {
                if (err) {
                    return next (err);
                }
                var user = {
                    id: this.lastID,
                    username: req.body.username,
                };
                req.login (user, function (err) {
                    if (err) {
                        return next (err);
                    }
                    res.redirect ('/');
                });
            });
        });
    });   

module.exports = router;    // export the router object so it can be used in app.js
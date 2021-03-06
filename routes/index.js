// ===========================
// ALL OTHER GENERAL PURPOSE ROUTES
// ===========================

const express = require('express');
const router = express.Router(); // add router variable to add routes to it instead or app variable
const passport = require('passport');
const User = require('../models/user');


// Root route
router.get('/', function(req, res){
    res.render('landing');
});

// ===========================
// AUTH ROUTES
// ===========================

// show register form
router.get('/register', function(req, res){
    res.render('register', {page: 'register'});
});
// handle sign up logic
router.post('/register', function(req, res){
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){ // method that creates a new user with its password from the form data
        if(err){
            console.log(err);
            return res.render("register", {error: "Пользователь с таким именем уже существует. Попробуйте выбрать другое имя"});
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', `Добро пожаловать, ${user.username}`);
            res.redirect('/restaurants');
        });
    });
});
// show login form
router.get('/login', function(req, res){
    res.render('login', {page: 'login'});
});
// handle login logic
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/restaurants',
        failureRedirect: '/login',
    }), function(req, res){ // this callback function doesn't do anything and is here just to demonstrante that 'pasport.authenticate...' is a middleware
});

// add logout route
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'Вы вышли из системы')
    res.redirect('/restaurants');
});


module.exports = router;
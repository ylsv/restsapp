// ===========================
// RESTAURANT ROUTES
// ===========================

const express = require('express');
const router = express.Router(); // add router variable to add routes to it instead or app variable
const Restaurant = require('../models/restaurant');

// INDEX ROUTE - show all restaurants
router.get('/', function(req, res){
    // Get all restaurants from DB and render them
    Restaurant.find({}, function(err, allRests){
        if(err){
            console.log(err);
        } else {
            res.render('restaurants/index', {restaurants: allRests});
        }
    });
});

// CREATE ROUTE - add new restaurant to DB
router.post('/', isLoggedIn, function(req, res){
    //get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    const newRestaurant = {name: name, image: image, description: desc, author: author};
    // Create a new rest and save it to DB
    Restaurant.create(newRestaurant, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to rests index page
            res.redirect('/restaurants');
        }
    });
});

// NEW ROUTE - show form to create new restaurant
router.get('/new', isLoggedIn, function(req, res){
    res.render('restaurants/new');
});

// SHOW ROUTE - shows more info about one restaurant
router.get('/:id', function(req, res){
    // find the restaurand with provided ID using mongoose .findById() method
    Restaurant.findById(req.params.id).populate('comments').exec(function(err, foundRestaurant){
        if (err){
            console.log(err);
        } else {
            // render show template with that found restaurant
            res.render('restaurants/show', {restaurant: foundRestaurant});
        }
    });
});

function isLoggedIn(req, res, next){ // middleware we create to check if the user is logged in (to be added to the routes);
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = router;
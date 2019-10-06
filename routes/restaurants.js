// ===========================
// RESTAURANT ROUTES
// ===========================

const express = require('express');
const router = express.Router(); // add router variable to add routes to it instead or app variable
const Restaurant = require('../models/restaurant');
const middleware = require('../middleware'); // automatically requires 'index.js' in this directory for middleware

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
router.post('/', middleware.isLoggedIn, function(req, res){
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
            req.flash('success', 'Вы добавили новый ресторан!');
            //redirect back to rests index page
            res.redirect('/restaurants');
        }
    });
});

// NEW ROUTE - show form to create new restaurant
router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('restaurants/new');
});

// SHOW ROUTE - shows more info about one restaurant
router.get('/:id', function(req, res){
    // find the restaurand with provided ID using mongoose .findById() method
    Restaurant.findById(req.params.id).populate('comments').exec(function(err, foundRestaurant){
        if (err || !foundRestaurant){
            req.flash('error', 'Ресторан не найден!');
            res.redirect('back');
        } else {
            // render show template with that found restaurant
            res.render('restaurants/show', {restaurant: foundRestaurant});
        }
    });
});

// EDIT ROUTE - shows form to edit a particular restaurant
router.get('/:id/edit', middleware.checkRestOwnership, function(req, res){
        Restaurant.findById(req.params.id, function(err, foundRestaurant){
            res.render('restaurants/edit', {restaurant: foundRestaurant});
    });
});

// UPDATE ROUTE - finds and updates the restaurant and redirects to show page
router.put('/:id', middleware.checkRestOwnership, function(req, res){
    Restaurant.findByIdAndUpdate(req.params.id, req.body.restaurant, function(err, updatedRestaurant){
        if(err){
            res.redirect('/');
        } else {
            res.redirect(`/restaurants/${req.params.id}`);
        }
    });
});

// DESTROY ROUTE - deletes a restaurant and redirects to the show page
router.delete('/:id', middleware.checkRestOwnership, function(req, res){
    Restaurant.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/restaurants');
        } else {
            req.flash('success', 'Ресторан удален :(');
            res.redirect('/restaurants');
        }   
    });
});


module.exports = router;
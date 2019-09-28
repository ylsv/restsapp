// ===========================
// COMMENTS ROUTES
// ===========================

const express = require('express');
const router = express.Router({mergeParams: true}); // add router variable to add routes to it instead or app variable
const Restaurant = require('../models/restaurant');
const Comment = require('../models/comment');

// Comments new
router.get('/new', isLoggedIn, function(req,res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new', {restaurant: restaurant});
        }
    });
});

// Comments create
router.post('/', isLoggedIn, function(req, res){
    // lookup restaurant using ID
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
            res.redirect('/restaurants');
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    // connect new comment to restaurant
                    restaurant.comments.push(comment);
                    restaurant.save();
                    // redirect to restaurant show page
                    res.redirect(`/restaurants/${restaurant._id}`);
                }
            });
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
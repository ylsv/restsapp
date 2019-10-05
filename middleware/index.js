// all the middleware goes here

const Restaurant = require('../models/restaurant');
const Comment = require('../models/comment');
const middlewareObj = {};

// middleware for authorization (permittion for the logged in user to do things)
middlewareObj.checkRestOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Restaurant.findById(req.params.id, function(err, foundRestaurant){
            if(err){
                res.redirect('back');
            } else {
                // does user own the restaurant?
                if(foundRestaurant.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back');
            } else {
                // does user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
};

// middleware for authentication (logged in or not?)
middlewareObj.isLoggedIn = function(req, res, next){ 
    if(req.isAuthenticated()){
        return next();
    }
    // flash message goes here
    req.flash('error', 'Пожалуйста, войдите или зарегистрируйтесь');
    res.redirect('/login');
}

module.exports = middlewareObj;
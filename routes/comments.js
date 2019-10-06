// ===========================
// COMMENTS ROUTES
// ===========================

const express = require('express');
const router = express.Router({mergeParams: true}); // add router variable to add routes to it instead of app variable
const Restaurant = require('../models/restaurant');
const Comment = require('../models/comment');
const middleware = require('../middleware'); // automatically requires 'index.js' in this directory for middleware

// Comments new
router.get('/new', middleware.isLoggedIn, function(req,res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new', {restaurant: restaurant});
        }
    });
});

// Comments create
router.post('/', middleware.isLoggedIn, function(req, res){
    // lookup restaurant using ID
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
            res.redirect('/restaurants');
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash('error', 'Что-то пошло не так');
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
                    req.flash('success', 'Вы добавили новый комментарий!');
                    // redirect to restaurant show page
                    res.redirect(`/restaurants/${restaurant._id}`);
                }
            });
        }
    });
});

// Comment edit
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
    Restaurant.findById(req.params.id, function(err, foundRestaurant){
        if(err || !foundRestaurant){
            req.flash('error', 'Ресторан не найден');
            return res.redirect('back');
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back');
            } else {
                res.render('comments/edit', {restaurant_id: req.params.id, comment: foundComment});
            }
        }); 
    });
});

// Comment update
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err){
            res.redirect('back');
        } else {
            res.redirect(`/restaurants/${req.params.id}`);
        }
    })
});

// Comment destroy
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err){
            res.redirect('back');
        } else {
            req.flash('success', 'Комментарий удален!');
            res.redirect(`/restaurants/${req.params.id}`);
        }
    });
});


module.exports = router;
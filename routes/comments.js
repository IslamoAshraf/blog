// jshint esversion: 6
//====================
//==comments routes===
//====================
//creat new comment

//connect new comment

//redirect camp show page
const express = require('express');
const router = express.Router();
const Campground = require("../models/campground");
const Comment = require("../models/comments");
const middleware = require("../meddleware/index.js");



router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function (req, res) {
    campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function (req, res) {
    //look campground using id
    campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash("error", "you need to log in");
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("error", "Succefully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            }
            );
        }
    });
});

//edit comment
router.get("/campgrounds/:id/comments/:comments_id/edit", middleware.ownerShipComment, function (req, res) {
    Comment.findById(req.params.comments_id, function (err, foundedComment) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundedComment });
        }
    });
});

//comments update
router.put("/campgrounds/:id/comments/:comments_id", middleware.ownerShipComment, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
//Destroy route
router.delete("/campgrounds/:id/comments/:comments_id", middleware.ownerShipComment, function (req, res) {
    Comment.findByIdAndRemove(req.params.comments_id, function (err) {
        if (err) {
            console.log(err);
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;
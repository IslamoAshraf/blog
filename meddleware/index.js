var middlewareObj = {};
var campground = require("../models/campground");
var Comment = require("../models/comments");
//Camp ownership
middlewareObj.ownerShip = function (req, res, next) {
    //is logged in
    if (req.isAuthenticated()) {
        campground.findById(req.params.id, function (err, founded) {
            if (err) {
                res.redirect("/campgrounds");
            } else {
                //does user own campground?
                if (founded.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You dont have permission");
                    res.redirect("/campgrounds");
                }
            }
        });
    } else {
        res.redirect("/login");
    }
};

//comment ownership
middlewareObj.ownerShipComment = function (req, res, next) {
    //is logged in
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comments_id, function (err, founded) {
            if (err) {
                req.flash("error", "campground not found");
                res.redirect("/campgrounds");
            } else {
                //does user own campground?
                if (founded.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "you dont have permission");
                    res.redirect("/campgrounds");
                }
            }
        });
    } else {
        req.flash("error", "you need to log in");
        res.redirect("/login");
    }
};

//is logged in logic middleware
middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please log in first!');
    res.redirect("/login");
};







module.exports = middlewareObj;
// jshint esversion: 6
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');



//auth
//show register form
router.get("/register", function (req, res) {
    res.render("register");
});
//handle signup logic
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            req.flash('error', err.message + '!');
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash('success', "Welcome " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function (req, res) {
    res.render("login");
});
//handle login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {

});

//logout logic
router.get("/logout", function (req, res) {
    req.logOut();
    req.flash('success', 'You logged out!');
    res.redirect("back");
});


module.exports = router;
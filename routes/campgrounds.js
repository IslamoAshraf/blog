// jshint esversion: 6
const express = require('express');
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../meddleware/index.js");

router.get("/", function (req, res) {
    res.render("campgrounds/landing");
});

router.get("/campgrounds", function (req, res) {
    //get all from db
    campground.find({}, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds", { campgrounds: campground });
        }
    });
});
//edit campground
router.get("/campgrounds/:id/edit", middleware.ownerShip, function (req, res) {
    //is user logged in?
    campground.findById(req.params.id, function (err, founded) {
        if (err) {
            res.redirect("back");
        } else
            //does user own campground?
            res.render("campgrounds/edit", { campground: founded });

    });

});
//update campground
router.put("/campgrounds/:id", middleware.ownerShip, function (req, res) {
    //find and update specified 
    campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updated) {
        if (err) {
            console.log(err);
        } else {
            //rendre it
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
//destroy campground
router.delete("/campgrounds/:id", middleware.ownerShip, function (req, res) {
    campground.findByIdAndDelete(req.params.id, function (err, founded) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//Creat route
router.post("/campgrounds", middleware.isLoggedIn, function (req, res) {
    //get data from user to add it
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var dsc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = { name: name, image: image, description: dsc, author: author, price: price };
    //Create to save to db
    campground.create(newCampground, function (err, Created) {
        if (err) {
            console.log(err);
        } else {
            //redirect
            res.redirect("/campgrounds");
        }
    });
});
//show form to creat camp
router.get("/campgrounds/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});
//show more info about selected route
router.get("/campgrounds/:id", function (req, res) {
    //find id
    campground.findById(req.params.id).populate("comments").exec(function (err, founded) {
        if (err) {
            console.log(err);
        } else {
            //rendre it
            res.render("campgrounds/show", { campgrounds: founded });
        }
    });
});


module.exports = router;
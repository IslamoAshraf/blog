// jshint esversion: 6
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
var flash = require('connect-flash');


//modeules
const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");

User = require("./models/user");
campground = require("./models/campground");
Comment = require("./models/comments");
seedDB = require("./seed");


app.use(flash());
mongoose.connect('mongodb+srv://IslamAshraf:esHCqmLEq83@sDg@yelp-tdsgu.mongodb.net/Yelp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


//passport config
app.use(require("express-session")({
    secret: "dkddl kdsmdsksm",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//global passing
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("back");
}



const PORT = 3000 || process.env.PORT

app.listen(PORT, () => {
    console.log(`app is listening to PORT ${PORT}`)
})

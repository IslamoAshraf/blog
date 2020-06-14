// jshint esversion: 6
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cat', { useNewUrlParser: true, useUnifiedTopology: true });

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    color: String
});

const Cat = mongoose.model('Cat', catSchema);

//add cat to database
var cats = new Cat({
    name: "metnak",
    age: 26,
    color: "red"
});
cats.save().then(() => console.log(cats));

//creat
Cat.create({
    name: 'a7aaaaa',
    age: 2555,
    color: "green"
}, function (err, cat) {
    if (err) {
        console.log(err);
    } else {
        console.log(cat);
    }
});

//retrive all cats
Cat.find({}, function (err, cats) {
    if (err) {
        console.log(err);
    } else {
        console.log(cats);
    }
});
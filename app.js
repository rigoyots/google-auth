// app.js template
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require('passport');
const googleStratergy = require('./googleStrategy')

const app = express();

app.use(passport.initialize())

app.set('view engine', 'ejs');

// app.get('/', function (req, res) {
//     res.render("index");
// });

app.get('/', passport.authenticate('google', {
    scope: ['email', 'profile']
}), (req, res) => {

});

app.get('/callback', passport.authenticate('google', {
    scope: ['email', 'profile']
}), (req, res) => {
    return res.send("Congrats");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
// app.js template
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(new GoogleStrategy({
        clientID: "90371486224-au7t697muie2kivm3fdql4s3hfhniett.apps.googleusercontent.com",
        clientSecret: "qDmfI5SczQvB5nWnJfGVzxNg",
        callbackURL: "http://www.example.com/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({
            googleId: profile.id
        }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render("index");
});

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile']
    }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
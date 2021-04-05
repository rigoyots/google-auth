// app.js template
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

mongoose.connect("mongodb://localhost:27017/sikretoDB", {
    useNewUrlParser: true
});

const app = express();

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    googleId: Number
});
UserSchema.plugin(findOrCreate);
var User = mongoose.model('User', UserSchema);

passport.use(new GoogleStrategy({
        clientID: "90371486224-au7t697muie2kivm3fdql4s3hfhniett.apps.googleusercontent.com",
        clientSecret: "qDmfI5SczQvB5nWnJfGVzxNg",
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({
            googleId: profile.id
        }, function (err, user) {
            console.log('A new user from "%s" was inserted', user.googleId);
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
        res.send("Congratulations, you did it!");
    });

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
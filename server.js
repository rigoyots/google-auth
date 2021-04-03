const passport = require('passport');
const express = require("express")
const googleStratergy = require('./googleStrategy')

const app = express();

// app.use(googleStratergy);
app.use(passport.initialize())

// Api call for google authentication
app.get('/',
passport.authenticate('google', {
    scope: ['email', 'profile']
}), (req, res) => {

});

// Api call back function
app.get('/callback', passport.authenticate('google', {
        scope: ['email', 'profile']
    }),
    (req, res) => {
        return res.send("Congrats");
    });

app.listen(3000, () => console.log('app listening on port 3000!'));
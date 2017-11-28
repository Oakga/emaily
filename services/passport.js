const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});// turn the user into id

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
}); // turn id into moogoose collection


passport.use(new GoogleStrategy({
    clientID: keys.googleClientID, //idenitfy ourself to google servers
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleID: profile.id }).then((existingUser)=> { if (existingUser) {
        // we already have a record with a given profile id
        done(null, existingUser );// no error here , existing user return
    } else { 
        // make a new record if the ID doesn't exist
        new User({ googleID: profile.id }).save()// new model instance aka a record
        .then(user => done(null, user));     // this user is more updated
    };
    });
}));


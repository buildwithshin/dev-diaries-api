require('dotenv').config();

// Passport package is an authentication middleware for Node.js. It can be added to any express-based web application. A comphrehensive set of strategies that support authentication using username and password, twitter, facebook, and more accounts. 

//authentication middleware
const passport = require('passport');

// Strategy module contains algorithm that are use for specific purposes. In this case, authentication the application using Google API console project OAuth Client ID Credentials.
const GoogleStrategy = require ('passport-google-oauth20').Strategy;

// This configures Passport to use the Google OAuth2.0 authentication strategy
passport.use(new GoogleStrategy({
	clientID: process.env.clientID,
	clientSecret: process.env.clientSecret,
	callbackURL: "http://localhost:4000/users/google/callback",
	passReqToCallback: true
},
//this is the callback function that will be executed when a user is successfult authenticated
// returns the "profile or information" of the authenticated user: email, firstname, lastname
function (request, accesToken, refreshToken, profile, done){
	return done(null, profile);
})
);

// This function is used to serialize the user object or user information into a session.
// In this case, the entire user object is serialized. 
// The serialized user object is then stored in the session.
passport.serializeUser(function(user, done){
	done(null, user);
})


// This function is used to deserialize the user object from the session.
passport.deserializeUser(function(user,done){
	done(null, user);
})
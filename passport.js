var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('./app/models/User')
var configAuth = require('./config');

var id = process.env.clientID || configAuth.googleAuth.clientId;
var secret = process.env.clientSecret || configAuth.googleAuth.clientSecret;
var callback = process.env.callbackURL || configAuth.googleAuth.callbackURL;

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findOne({'id': id}, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({
        clientID        : id,
        clientSecret    : secret,
        callbackURL     : callback
    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({ 'id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser          = new User();

                    // set all of the relevant information
                    newUser.id    = profile.id;
                    newUser.token = token;
                    newUser.name  = profile.displayName;
                    newUser.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    }));

};

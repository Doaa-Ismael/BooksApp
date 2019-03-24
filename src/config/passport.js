const passport = require('passport');
require('./strategies/local.strategy')();

module.exports = (app) => {

    app.use(passport.initialize());
    app.use(passport.session());


    // Store users in session
    passport.serializeUser((user, done) => {
        console.log("SERIALIZEeeeeeeeeeeeeeeeee", user);
        done(null, user);
    });


    // Remove users from session
    passport.deserializeUser((user, done) => {
        console.log("DESERIALIZEeeeeeeeeeeeeeeeee", user);
        done(null, user);
    });




};
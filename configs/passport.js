const bcrypt = require('bcrypt-nodejs');
module.exports = (passport, user) => {
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser((user, done) => {
        User.findById(id) .then((user) => {
            if (user) {
                done(null, user.get());
            }
            else {
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy({
        passwordField: 'email',
        passwordField: 'password',
        passReqToCallback: true 
    }))
}
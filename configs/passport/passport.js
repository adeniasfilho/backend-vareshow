const bcrypt = require('bcrypt-nodejs');
module.exports = (passport, user) => {
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
    passport.use('local-signup', new LocalStrategy({
        passwordField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }));

    function validaFormulario(req, email, password, done) {
        const generateHash = (password) => {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
        };
        User.findOne({
            where: {
                email: email
            }
        }).then((user) => {
            if (user) {
                return done(null, false, jsonMessages.user.duplicate);
            } else {
                const userPassword = generateHash(password);
                const data = {
                    email: email,
                    password: password,
                    nome: req.body.firstName,
                    ultimoNome: req.body.lastName
                };
            }
            User.create(data).then((newUser, created) => {
                if (!newUser) {
                    return done(null, false);
                }
                if (newUser) {
                    return done(null, newUser);
                }
            })
        });
    }
    passport.use('local-signin', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function verificarDados(req, email, password, done) {
            const User = user;
            const isValidPassword = (userpass, password) => {
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({
                where: {
                    email: email
                }
            }).then((user) => {
                if (!user) {
                    return done(null, false, jsonMessages.user.email);
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, jsonMessages.user.password);
                }
                const userInfo = user.get();
                return done(null, userInfo);
            }).catch((err) => {
                console.log("Error: ", err);
                return done(null, false, jsonMessages.user.password);
            });
        }));
}
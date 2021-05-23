const app = require('./server');
const router = require('./routes/main.route');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const expressSanitizer = require('express-sanitizer');
const expressValidator = require('express-validator');
const models = require('./models');

app.use(express.json(), express.json().urlencoded({ extended: true }));
app.use(expressSanitizer());
app.set('trust proxy', 1);
app.use(session({
    secret: 'webvareshow',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 60000,
        httpOnly: true,
    }
}))
app.use(expressValidator());

app.use((req, res, next) => {
    if (global.sessData === undefined) {
        global.sessData = req.session;
        global.sessData.ID = req.sessionID;
    }
    else {
        console.log('session exists', global.sessData.ID);
    }
    next();
});

app.use(passport.initialize());
app.use(passport.session());
require('./routes/auth.route.js') (app, passport);
require('./config/passport/passport.js') (passport, models.user);

models.sequelize.sync().then(function() {
    console.log('OK! MODELOS SINCRONIZADOS COM BASE DE DADOS')
}).catch(function(err) {
    console.log(err, 'ALGUNS MODELOS NÃO FORAM DEVIDAMENTE SINCRONIZADOS + ',
    'COM A ATUALIZAÇÃO DA BASE DE DADOS')
});

app.use('/', router);
module.exports = app;
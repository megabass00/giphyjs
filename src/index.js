// imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const expHb = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const config = require('./config/config');


// initizalizations
const app = express();
require('./config/database');
require('./config/passport');


// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expHb({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('secret', config.secret);


// middlewares
// app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cookieParser(app.get('secret')));
app.use(session({
    key: 'user_sid',
    secret: app.get('secret'),
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000*60*60 * 1 // 1 hour
    }
}));
// app.use(session({
//     secret: app.get('secret'),
//     resave: true,
//     saveUninitialized: true
// }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.errors_msg = req.flash('errors_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


// routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/giphies'));
app.use(require('./routes/api'));
// app.get('*', (req, res) => { 
//     res.render('errors/404'); 
// });


// static files
app.use(express.static(path.join(__dirname, 'public')));


// starting
app.listen(app.get('port'), () => {
    console.log('Server listen on port', app.get('port'));
});
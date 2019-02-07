// imports
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const expHb = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


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


// middlewares
// app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'XXX',
    resave: true,
    saveUninitialized: true
}));
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
// app.get('*', (req, res) => { 
//     res.render('errors/404'); 
// });


// static files
app.use(express.static(path.join(__dirname, 'public')));


// starting
app.listen(app.get('port'), () => {
    console.log('Server listen on port', app.get('port'));
});
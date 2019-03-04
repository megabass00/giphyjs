// imports
require('custom-env').env(true);
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const expHb = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const flash = require('connect-flash');
const passport = require('passport');
// const resize = require('./helpers/resize');
const { isAuthenticated } = require('./helpers/auth');
const config = require('./config/config');

console.log('Runnin on '+ process.env.ENVIRONMENT +' mode');


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
app.use((req, res, next) => {
    req.getInternalPublicUrl = () => path.join(__dirname, 'public/');
    req.getUrl = () => req.protocol + "://" + req.get('host') + req.originalUrl;
    req.getBaseUrl = () => req.protocol + "://" + req.get('host') + '/';
    return next();
});
// app.use(morgan('tiny'));
app.use(fileUpload());
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
        expires: 1000*60*60 * 1  // 1 hour
    }
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
app.use(require('./routes/api'));
// app.get('/resize-image', isAuthenticated, (req, res) => {
//     const imagePath = req.query.path;
//     const format = req.query.format || 'png';
//     const width = (req.query.width) ? parseInt(req.query.width) : 100;
//     const height = (req.query.height) ? parseInt(req.query.height) : 100;

//     res.type(`image/${format}`);
//     resize(imagePath, format, width, height).pipe(res);
// });
// app.get('*', (req, res) => { 
//     res.render('errors/404'); 
// });


// static files
app.use(express.static(path.join(__dirname, 'public')));


// starting
app.listen(app.get('port'), () => {
    console.log('Server listen on port', app.get('port'));
});
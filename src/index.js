// imports
const express = require('express');
const path = require('path');
const expHb = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');


// initizalizations
const app = express();
require('./database');


// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expHb({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'XXX',
    resave: true,
    saveUninitialized: true
}));

// global vars


// routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/giphies'));


// static files
app.use(express.static(path.join(__dirname, 'public')));


// starting
app.listen(app.get('port'), () => {
    console.log('Server listen on port', app.get('port'));
});
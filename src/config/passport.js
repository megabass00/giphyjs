const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        console.log('Usuario no encontrado');
        return done(null, false, {message: 'No user found in database'});
    }else{
        const match = await user.matchPassword(password);
        if (match) {
            console.log('Contraseña correcta');
            return done(null, user);
        }else{
            console.log('Password incorrecto');
            return done(null, false, {message: 'Incorrect password'});
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = User.findById(id, (err, user) => {
        done(err, user);
    });
});
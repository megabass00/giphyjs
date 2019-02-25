const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');

router.get('/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/giphies/',
    failureRedirect: '/signin',
    failureFlash: true
}));
// router.post('/signin', (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         if (err) { return next(err); }
//         if (!user) { 
//             req.flash('errors_msg', 'Access data is wrong');
//             return res.redirect('/signin'); 
//         }
//         req.logIn(user, (err) => {
//             if (err) { return next(err); }
//             if (req.body.remember_me) {
//                 var oneHour = 3600000;
//                 req.session.cookie.expires = new Date(Date.now() + oneHour);
//                 req.session.cookie.maxAge = oneHour;
//                 console.log('Cookie session setted', req.session.cookie);
//             }else{
//                 req.session.cookie.expires = false;
//             }
//             return res.redirect('/giphies');
//         });
//     })(req, res, next);
// });

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/signup', async (req, res) => {
    const { mastername, email, password, confirm_password } = req.body;
    const errors = [];
    if (password != confirm_password) {
        errors.push({message: 'Password do not match'});
    }
    if (password.length < 4) {
        errors.push({message: 'Password must be least 4 characters'});
    }
    if (errors.length > 0) {
        res.render('users/signup', { mastername, email, password, confirm_password, errors });
    }else{
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('errors_msg', 'The email is already in use');
            res.redirect('/signup');
        }else{
            const newUser = new User({ mastername, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered successfully');
            res.redirect('/giphies/');
        }
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

router.get('/edit-profile', isAuthenticated, async (req, res) => {
    const user = await User.findById(req.user.id);
    console.log(user);
    res.render('users/edit', { user });
});

module.exports = router;
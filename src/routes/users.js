const router = require('express').Router();
const User = require('../models/User');

router.get('/signin', (req, res) => {
    res.render('users/signin');
});

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

module.exports = router;
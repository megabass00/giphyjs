const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');
const slugify = require('slugify');
const { isAuthenticated } = require('../helpers/auth');

// singin //
router.get('/signin', (req, res) => {
    const email = req.signedCookies['username'];
    const password = req.signedCookies['password'];
    const remember = (email && password);
    res.render('users/signin', { email, password, remember });
});

// router.post('/signin', passport.authenticate('local', {
//     successRedirect: '/giphies/',
//     failureRedirect: '/signin',
//     failureFlash: true
// }));
router.post('/signin', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { 
            req.flash('errors_msg', 'Access data is wrong');
            return res.redirect('/signin'); 
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            if (req.body.remember_me) {
                // var oneHour = 1000*60*60 * 1;
                res.cookie('username', req.body.email, { httpOnly: true, signed: true });
                res.cookie('password', req.body.password, { httpOnly: true, signed: true });
            }else{
                res.clearCookie('username');
                res.clearCookie('password');
            }
            return res.redirect('/giphies');
        });
    })(req, res, next);
});

// singup //
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

// logout //
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

// edit profile //
router.get('/edit-profile', isAuthenticated, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.render('users/edit', { user });
});

router.post('/edit-profile', isAuthenticated, async (req , res) => {
    const { mastername, email } = req.body;
    var avatar = req.user.avatar;
    if (req.files.avatar) {
        const extension = req.files.avatar.name.split('.')[1];
        const filename = slugify(req.body.mastername.toLowerCase())+'.'+extension;
        const pathToSave = req.getInternalPublicUrl() +'/img/users/'+ filename;
        console.log('Uploading:', pathToSave);
        req.files.avatar.mv(pathToSave, function(err) {
            if (err) {
                return res.status(500).send(err);
            }else{
                console.log('Avatar uploaded');
            }
        });
        avatar = filename;
    }
    // console.log(mastername, email, avatar);
    const user = await User.findByIdAndUpdate(req.user.id, { mastername, email, avatar }, {new: true});
    req.flash('success_msg', 'Your data was updated successfully!');
    res.redirect('/edit-profile');
});

// change password //
router.get('/change-password', isAuthenticated, (req, res) => {
    res.render('users/change-pass');
});

router.post('/change-password', isAuthenticated, async (req, res) => {
    const { password, confirm_password } = req.body;
    const errors = [];
    if (!password || !confirm_password) {
        errors.push({message: 'It is necessary you fill the two fields'});
    }
    if (password != confirm_password) {
        errors.push({message: 'The passwords do not match'})
    }
    if (password.length < 4) {
        errors.push({message: 'Password must be least 4 characters'});
    }
    if (errors.length > 0) {
        res.render('users/change-pass', { errors });
    }else{
        await User.findById(req.user.id).then(async (user) => {
            if (user) {
                user.password = await user.encryptPassword(password);
                await user.save();
                req.flash('success_msg', 'Your password was updated successfully');
                res.redirect('/change-password');
            }else{
                req.flash('errors_msg', 'There was an error updating password');
                res.redirect('/change-password');
            }
        });
    }
});

module.exports = router;
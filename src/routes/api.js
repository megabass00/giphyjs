const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Giphy = require('../models/Giphy');
const { hasToken, getError } = require('../helpers/auth');

/**
 * USERS
 */
router.post('/api/signin', (req, res) => {
    if (!req.body.email) { res.status(403).json(getError('Email is needed')); return; }
    if (!req.body.password) { res.status(403).json(getError('Password is needed')); return; }
    const { email, password } = req.body;
    User.findOne({email: email}, async (err, user) => {
        if (err) { res.status(500).send(err); }
        if (!user) {
            res.status(403).json(getError('Email is not exists on database'));
        }else{
            if (!await user.matchPassword(password)) {
                res.status(403).json(getError('Password is wrong'));
            }else{
                const token = jwt.sign({user}, req.app.get('secret'));
                res.status(200).json({
                    success: true,
                    user,
                    token
                });
            }
        }
    });
});

router.post('/api/signup', async (req, res) => {
    const { mastername, email, password, confirm_password } = req.body;
    const errors = [];
    if (password != confirm_password) {
        errors.push({message: 'Password do not match'});
    }
    if (password.length < 4) {
        errors.push({message: 'Password must be least 4 characters'});
    }
    if (errors.length > 0) {
        res.status(403).json(getError('Missing data', errors));
    }else{
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            res.status(403).json(getError('The email is already in use'));
        }else{
            const newUser = new User({ mastername, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            const token = jwt.sign({newUser}, req.app.get('secret'));
            res.status(200).json({
                success: true,
                user: newUser,
                token
            });
        }
    }
});



/**
 * GIPHIES
 */
router.get('/api/giphies/', hasToken, async (req, res) => {
    const giphies = await Giphy.find();
    // console.log(`Return ${giphies.length} giphies`);
    res.status(200).json({
        success: true,
        giphies
    });
});


module.exports = router;
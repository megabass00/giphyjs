const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Giphy = require('../models/Giphy');
const { hasToken, getError } = require('../helpers/auth');

/**
 * USERS
 */
router.post('/api/signin', (req, res) => {
    if (!req.body.email) { res.status(403).json(getError('Email is needed')); }
    if (!req.body.password) { res.status(403).json(getError('Password is needed')); }
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

router.post('/api/signup', (req, res) => {
    
});



/**
 * GIPHIES
 */
router.get('/api/giphies/', hasToken, async (req, res) => {
    const giphies = await Giphy.find();
    console.log(giphies.length);
    res.json(giphies);
});


module.exports = router;
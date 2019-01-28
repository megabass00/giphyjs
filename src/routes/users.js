const router = require('express').Router();

router.get('/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

module.exports = router;
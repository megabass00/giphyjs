const router = require('express').Router();

router.get('/signin', (req, res) => {
    res.send('Signin');
});

router.get('/signup', (req, res) => {
    res.send('Signup');
});

module.exports = router;
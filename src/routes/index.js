const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello');
});

router.get('/about', (req, res) => {
    res.send('About');
});

module.exports = router;
const router = require('express').Router();

router.get('/giphies', (req, res) => {
    res.send('List of giphies');
});

module.exports = router;
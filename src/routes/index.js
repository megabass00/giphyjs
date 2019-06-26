const router = require('express').Router();
const Giphy = require('../models/Giphy');

router.get('/', async (req, res) => {
    const topGiphies = await Giphy.find().limit(20).sort({ title: -1 }).select({ title: 1, url: 1 });
    res.render('index', { topGiphies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;
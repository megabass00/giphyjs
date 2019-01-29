const router = require('express').Router();
const Giphy = require('../models/Giphy');

router.get('/giphies', async (req, res) => {
    const giphies = await  Giphy.find();
    res.render('giphies/list', { giphies });
});

router.get('/giphies/new-giphy', (req, res) => {
    res.render('giphies/add');
});

router.post('/giphies/add', async (req, res) => {
    // console.log(req.body);
    var errors = validateGiphy(req.body);
    const { title, description, url } = req.body;
    if (errors.length > 0) {
        res.render('giphies/add', { errors, title, description, url });
    }else{
        const newGiphy = new Giphy({ title, description, url });
        await newGiphy.save();
        console.log(newGiphy);
        res.redirect('giphies/');
    }
});

function validateGiphy(data) {
    const { title, url } = data;
    var errors = [];
    if (!title) {
        errors.push({message: 'You must fill title field'});
    }
    if (!url) {
        errors.push({message: 'You must provide a url'});
    }
    var pattern =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    if (!pattern.test(url)) {
        errors.push({message: 'Url is not valid'});
    }
    return errors;
}

module.exports = router;
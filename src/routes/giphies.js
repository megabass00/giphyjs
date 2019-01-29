const router = require('express').Router();

router.get('/giphies', (req, res) => {
    res.send('List of giphies');
});

router.get('/giphies/new-giphy', (req, res) => {
    res.render('giphies/add');
});

router.post('/giphies/add', (req, res) => {
    // console.log(req.body);
    var errors = validateGiphy(req.body);
    const { title, description, url } = req.body;
    if (errors.length > 0) {
        res.render('giphies/add', { errors, title, description, url });
    }else{
        res.render('giphies');
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
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
            '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i');
    if (!pattern.test(url)) {
        errors.push({message: 'Url is not valid'});
    }
    return errors;
}

module.exports = router;
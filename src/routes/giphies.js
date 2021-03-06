const router = require('express').Router();
const Giphy = require('../models/Giphy');
const { isAuthenticated } = require('../helpers/auth');

router.get('/giphies', isAuthenticated, async (req, res) => {
    const giphies = await Giphy.find().limit(10);
    res.render('giphies/list', { giphies });
});

router.post('/giphies-ajax', async (req, res) => {
    // console.log('BODY', req.body);
    const { draw, start, length, columns, search, order } = req.body;
    const reqStart = parseInt(start);
    const reqLength = parseInt(length);
    console.log('Pagination', `Starts at ${start} with length ${length}`);
    console.log('Order', `Column ${order[0].column} with direction ${order[0].dir}`);
    console.log('Search', `Searching '${search.value}' with regex ${search.regex == 'false' ? 'NO' : 'YES'}`);

    const query = search.value ? Giphy.find({ title: new RegExp(search.value, 'i') }) : Giphy.find();
    const giphies = await query.skip(reqStart).limit(reqLength).sort({ title: order[0].dir=='asc' ? 1 : -1 });
    const total = search.value ? (await query).length : await Giphy.countDocuments();
    const retval = { data: giphies, draw, recordsTotal: total, recordsFiltered: total };
    res.json(retval);
});

router.get('/giphies/new-giphy', isAuthenticated, (req, res) => {
    res.render('giphies/add');
});

router.post('/giphies/add', isAuthenticated, async (req, res) => {
    var errors = validateGiphy(req.body);
    const { title, description, url } = req.body;
    if (errors.length > 0) {
        res.render('giphies/add', { errors, title, description, url });
    }else{
        const newGiphy = new Giphy({ title, description, url });
        await newGiphy.save();
        req.flash('success_msg', 'New giphy added successfully');
        res.redirect('/giphies/');
    }
});

router.get('/giphies/edit-giphy/:id', isAuthenticated, async (req, res) => {
    const giphy = await Giphy.findById(req.params.id);
    res.render('giphies/edit', { giphy });
});

router.put('/giphies/edit/:id', isAuthenticated, async (req, res) => {
    const { _id, title, description, url } = req.body;
    const giphy = await Giphy.findByIdAndUpdate(req.params.id, { title, description, url });
    req.flash('success_msg', 'Giphy updated successfully');
    res.redirect('/giphies/');
});

router.get('/giphies/delete/:id', isAuthenticated, async (req, res) => {
    await Giphy.findByIdAndDelete(req.params.id);
    res.redirect('/giphies/');
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
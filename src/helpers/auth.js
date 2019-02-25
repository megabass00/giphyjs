const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('errors_msg', 'You are not authorized, you need a account');
    res.redirect('/signup');
};

helpers.hasToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['Authorization'];
    if (token) {
        jwt.verify(token, req.app.get('secret'), (err, decoded) => {
            if (err) { 
                res.status(403).json(helpers.getError('Authorization token fail')); 
            }else{
                req.token = token;
                next();
            }
        });
    }else{
        res.status(403).json(helpers.getError('Authorization token is not found')); 
    }
};

helpers.getError = (message) => {
    return {
        success: false,
        message
    }
}

module.exports = helpers;
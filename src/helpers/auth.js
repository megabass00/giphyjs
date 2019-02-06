const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('errors_msg', 'You are not authorized, you need a account');
    res.redirect('/signup');
};

module.exports = helpers;
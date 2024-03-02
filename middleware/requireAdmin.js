function requireAdmin(req, res, next) {
    if (req.session.user === 'Alibi') {
        next();
    } else {
        res.redirect('/');
    }
}
module.exports = requireAdmin;
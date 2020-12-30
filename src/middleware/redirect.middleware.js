module.exports = {
    signInChecker: (req, res, next) => {
        if (req.session.loggedin === undefined && !req.session.loggedin) {
            res.redirect('/login')
        } else {
            next()
        }
    }
}
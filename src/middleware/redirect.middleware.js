module.exports = {
    signInChecker: (req, res, next) => {
        console.log(req.session.loggedin)
        if (req.session.loggedin === undefined && !req.session.loggedin) {
            res.redirect('/login')
        } else {
            next()
        }
    }
}
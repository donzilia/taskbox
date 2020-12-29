const ERRORS = require("../config/errors")

module.exports = {
    registerValidator: (req, res, next) => {
        let {email, fullname, password} = req.body
        if ((email == null || email === '' || email === undefined)
            || (fullname == null || fullname === '' || fullname === undefined)
            || (password == null || password === '' || password === undefined)) {
            res.render("register", ERRORS.INVALID_INPUT)
            next();
        }
        next();
    },

    loginValidator: (req, res, next) => {
        let {email, password} = req.body;
        if ((email == null || email === '' || email === undefined)
            || (password == null || password === '' || password === undefined)) {
            res.render("login", ERRORS.INVALID_CREDENTIALS)
            next()
        }
        next();
    },

    activationValidator: (req, res, next) => {
        let {userId} = req.params;
        if (userId === null || userId === 0 || userId === undefined) {
            res.render("/login")
            next()
        }
        next();
    }
}
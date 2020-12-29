const ERRORS = require("../config/errors")

module.exports = {
    registerValidator: (req, res, next) => {
        let { email, fullname, password } = req.body
        console.log({ email, fullname, password })
        if ((email == null || email == '' || email==undefined) 
           || (fullname == null || fullname == '' || fullname==undefined) 
           || (password == null || password == '' || password==undefined )){
            res.render("register", ERRORS.INVALID_INPUT)
            next();
        }
    },
    loginValidator: (req, res, next) => {
        let { email, password } = req.body;
        if ((email == null || email == '' || email==undefined) 
        || (password == null || password == '' || password==undefined )) {
            res.render("login", ERRORS.INVALID_CREDENTIALS)
        }
    }
}
const User = require("../models/index").User
const ERRORS = require("../config/errors")

module.exports = {
    store: async (req, res, next) => {
        let {email, picture, fullname, password} = req.body
        if (email !== null) {
            res.render("register", ERRORS.INVALID_CREDENTIALS)
        }

        //todo: make validator middleware
        const [user, created] = await User.findOrCreate({where: {email: email}, defaults: req.body})

        if (created) {
            // todo: send mail
        }

        if (user) {
            res.render("register", ERRORS.USER_REGISTERED)
        }
    },

    update: async(req,res,next) => {
        //todo: implement update user here
    },

    resetPass: async(req, res, next) => {
        //todo: implement mailer here
    },

    login: async (req, res, next) => {
        let {email, password} = req.body;
        if((email == null || email == undefined) || (password == null || password == undefined)){
            res.render("login", ERRORS.INVALID_CREDENTIALS)
        }
        // validar pela hash da password
        const user = await User.findOne({where: {email: email, password: password}})
        if(user === null || user === undefined){
            res.render("login", ERRORS.USER_NOT_FOUND)
        }
        
        req.session.loggedin = true
        req.session.email = email
        res.redirect("/")
        res.end();
    }
}
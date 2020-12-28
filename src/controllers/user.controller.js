const User = require("../models/index").User;

module.exports = {
    store: async (req, res, next) => {
        let {email, picture, fullname, password} = req.body
        if (email !== null) {
            res.render("register", {
                error: true,
                message: "Invalid E-mail"
            })
        }

        //todo: make validator middleware
        const [user, created] = await User.findOrCreate({where: {email: email}, defaults: req.body})

        if (created) {
            // todo: send mail
        }

        if (user) {
            res.render("register", {
                error: true,
                message: "User already registered on the platform"
            })
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
            res.render("login", {
                error: INVALID_CREDENTIALS,
                message: "Invalid login credentials. Please try again!"
            })
        }
        // validar pela hash da password
        const user = await User.findOne({where: {email: email, password: password}})
        if(user === null || user === undefined){
            res.render("login", {
                error: USER_NOT_FOUND,
                message: "User with this credentials not found. Please try again!"
            })
        }
        
        req.session.loggedin = true
        req.session.email = email
        res.redirect("/")
        res.end();
    }
}
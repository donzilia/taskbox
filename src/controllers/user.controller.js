const User = require("../models/index").User
const ERRORS = require("../config/errors")
const mailer = require("../services/mailer")

module.exports = {
    store: async (req, res, next) => {
        let {email, picture, fullname, password} = req.body

        const [user, created] = await User.findOrCreate({
            where:
                {email: email, fullName: fullname, pass: password}
        })

        if (created) {
            let confirmationEmail = {
                from: "no-reply@taskbox.com",
                to: email,
                subject: "TASKBOX - REGISTRATION CONFIRMATION",
                text: `Hello ${fullname}, in order to confirm your registration please click <a href="localhost:3000/activate/${user.id}">here.</a>`,
            }
            mailer.sendMail(confirmationEmail, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`Email sent to  - ${email}`);
                }
            });
        } else {
            res.render("register", ERRORS.USER_REGISTERED)
        }
    },

    update: async (req, res, next) => {
        //todo: implement update user here
    },

    resetPass: async (req, res, next) => {
        //todo: implement mailer here
    },

    login: async (req, res, next) => {
        let {email, password} = req.body;

        //todo: validar pela hash da password
        const user = await User.findOne({where: {email: email, pass: password}})
        if (user === null || user === undefined) {
            res.render("login", ERRORS.USER_NOT_FOUND)
        }

        req.session.loggedin = true
        req.session.email = email
        res.redirect("/")
        res.end();
    },

    activate: async (req, res, next) => {
        let {userId} = req.params

        let user = await User.findByPk(userId)
        if(! user instanceof User){
            res.render("/login", ERRORS.USER_NOT_FOUND)
        }

        user.is_active = 1;
        await user.save();

        res.render("/login", "success object here")
    }
}
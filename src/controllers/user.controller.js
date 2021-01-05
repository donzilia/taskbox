const fs = require("fs")
const path = require("path")
const {User, Task} = require("../models/index")
const ERRORS = require("../config/errors")
const MESSAGE = require("../config/message")
const mailer = require("../services/mailer")
const url = require("url");


module.exports = {
    index: async (req, res, next) => {
        const user = await User.findByPk(req.session.userId)

        res.render("userprofile", {
            user: user
        })
    },

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
                text: `Hello ${fullname}, in order to confirm your registration please click <a href="https://taskbox-web-app.herokuapp.com/activate/${user.id}">here.</a>`,
            }
            mailer.sendMail(confirmationEmail, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`Email sent to  - ${email}`);
                }
            });
            res.render("register", MESSAGE.USER_REGISTERED_200)
        } else {
            res.render("register", ERRORS.USER_REGISTERED)
        }
    },

    update: async (req, res, next) => {
        const {fullname, email, password} = req.body

        const user = await User.findByPk(req.session.userId)
        user.fullName = fullname;
        user.email = email;
        user.pass = password;
        await user.save();

        if (req.file !== undefined) {
            const dir = `${req.headers.origin}/img/uploads/`;
            const tempPath = req.file.path;
            const targetPath = path.join(__dirname, `../../public/img/uploads/${req.file.filename}.png`);

            if (path.extname(req.file.originalname).toLowerCase() === ".png") {
                fs.rename(tempPath, targetPath, err => {
                    if (err) console.log(err)
                    const user = User.findByPk(req.session.userId).then(user => {
                        user.profilePic = `${dir}${req.file.filename}.png`
                        user.save();
                    }).catch(err => {
                        //todo: validade user message
                    })
                });
            } else {
                fs.unlink(tempPath, err => {
                    if (err) console.log(err)
                    res.send({error: "sim"});
                });
            }
        }
    },

    forgotPwd: async (req, res, next) => {
        let {email} = req.body
        const user = await User.findOne({where: {email: email, is_active: 1}})
        if (user === null || user === undefined) {
            res.render("forgotpassword", ERRORS.USER_NOT_FOUND)
        }

        let resetEmail = {
            from: "no-reply@taskbox.com",
            to: email,
            subject: "TASKBOX - Password Reset",
            text: `Hello ${user.fullName}, in order to reset your password credentials please click <a href="https://taskbox-web-app.herokuapp.com/reset-password/${user.id}">here.</a>`,
        }
        console.log(mailer)
        mailer.sendMail(resetEmail, function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log(`Email sent to  - ${email}`);
            }
        });

        res.render("forgotpassword", MESSAGE.RESET_MAIL_SENT)
    },

    resetPwd: async (req, res, next) => {
        let {userId} = req.params
        let {password, confirmpassword} = req.body

        if (password !== confirmpassword) {
            let args = {...{userId: userId}, ...ERRORS.INVALID_INPUT};
            res.render("resetpassword", args);
        }

        let user = await User.findByPk(userId)
        if (!user instanceof User) {
            res.redirect("/login")
        }

        user.pass = password;
        await user.save();

        let args = {...{userId: userId}, ...MESSAGE.PWD_UPDATED};
        res.render("resetpassword", args);
    },

    viewResetPassword: (req, res, next) => {
        let {userId} = req.params

        res.render("resetpassword", {userId: userId})
    },

    login: async (req, res, next) => {
        let {email, password} = req.body;

        //todo: validar pela hash da password
        const user = await User.findOne({where: {email: email, pass: password, is_active: 1}})
        if (user === null || user === undefined) {
            res.render("login", ERRORS.USER_NOT_FOUND)
        }

        let tasks = await Task.findAll()

        req.session.loggedin = true
        req.session.email = email
        req.session.userId = user.id
        res.redirect("/")
    },

    activate: async (req, res, next) => {
        let {userId} = req.params

        let user = await User.findByPk(userId)
        if (!user instanceof User) {
            res.redirect("/login")
        }

        user.is_active = 1;
        await user.save();

        res.render("login", MESSAGE.USER_ACTIVATED)
    },

    logout: (req, res, next) => {
        req.session.loggedin = false;
        req.session.email = null;
        req.session.destroy();
        res.redirect("/login");
    }
}
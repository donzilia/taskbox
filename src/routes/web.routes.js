const TaskController = require("../controllers/task.controller")
const HomeController = require("../controllers/home.controller")
const UserController = require("../controllers/user.controller")
const asyncRoute = require("../middleware/async.route")
const requestsMiddleware = require("../middleware/requests.middleware")
const {signInChecker} = require("../middleware/redirect.middleware")
const multer = require("multer")
const path = require("path")

var upload = multer({
    dest: path.join(__dirname, "../../public/tmp/files")
});
module.exports = (router) => {
    router.get('/', signInChecker, asyncRoute(HomeController.index))
    /**
     * login and register routes
     */
    router.get('/login',(req, res) => { res.render('login', {}) })
    router.post('/login', asyncRoute(UserController.login))
    router.post('/register', requestsMiddleware.registerValidator ,asyncRoute(UserController.store))
    router.get('/register', (req, res) => { res.render('register', {}) })
    router.get('/activate/:userId', requestsMiddleware.activationValidator, asyncRoute(UserController.activate))
    router.get('/forgot-password', (req, res) => { res.render('forgotpassword', {}) })
    router.post('/forgot-password', asyncRoute(UserController.forgotPwd))
    router.get('/reset-password/:userId', UserController.viewResetPassword)
    router.post('/reset-password/:userId', asyncRoute(UserController.resetPwd))
    router.get('/logout', signInChecker,UserController.logout)

    /***
     * Tasks routes
     */
    router.get('/daily', signInChecker, (req, res) => { res.render('daily', {}) })
    router.post('/new/task', signInChecker, requestsMiddleware.newTaskValidator, asyncRoute(TaskController.store))
    /**
     * User routes
     */
    router.get('/profile', signInChecker, asyncRoute(UserController.index))
    router.post('/edit/profile/:userId', upload.single("file"), asyncRoute(UserController.update))

    router.get('*', (req,res) => {
        res.render("404");
    })

}


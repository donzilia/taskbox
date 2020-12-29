const TaskController = require("../controllers/task.controller")
const UserController = require("../controllers/user.controller")
const asyncRoute = require("../middleware/async.route")
const requestsMiddleware = require("../middleware/requests.middleware")

module.exports = (router) => {
    router.get('/', asyncRoute(TaskController.index))

    /**
     * login and register routes
     */
    router.get('/login', (req, res) => { res.render('login', {}) })
    router.post('/login', asyncRoute(UserController.login))
    router.post('/register', requestsMiddleware.registerValidator ,asyncRoute(UserController.store))
    router.get('/register', (req, res) => { res.render('register', {}) })
    router.get('/forgot-password', (req, res) => { res.render('forgotpassword', {}) })

    /***
     * Tasks routes
     */
    router.get('/tasks', asyncRoute(TaskController.index))

    /**
     * User routes
     */

}
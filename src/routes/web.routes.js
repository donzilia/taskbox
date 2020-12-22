const TaskController = require("../controllers/task.controller")
const asyncRoute = require("../middleware/async.route")

module.exports = (router) => {
    router.get('/',  asyncRoute(TaskController.index))
    router.get('/login', (req, res) => { res.render('login', {}) })
    router.get('/register', (req, res) => { res.render('register', {}) })
    router.get('/forgot-password', (req, res) => { res.render('forgotpassword', {}) })
    router.get('/tasks', asyncRoute(TaskController.index))
}
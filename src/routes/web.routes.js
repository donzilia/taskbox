const TaskController = require("../controllers/task.controller")

module.exports = (router) => {
    router.get('/', (req, res) => { res.render('dashboard', {}) })
    router.get('/login', (req, res) => { res.render('login', {}) })
    router.get('/register', (req, res) => { res.render('register', {}) })
    router.get('/forgot-password', (req, res) => { res.render('forgotpassword', {}) })
    router.get('/tasks', TaskController.Index)
}
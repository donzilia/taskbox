const { taskbox } = require("../models/index");
const db = require("../models/index")
const Task = db.Task;
module.exports = {
    
    index: async (req, res, next) => {
        let tasks = await db.Task.findAll()
            
        res.render("dashboard", {
            title: "Dashboard",
            tasks: tasks
        })
    },
};
const { taskbox } = require("../models/index");
const db = require("../models/index")
const Task = db.Task;
module.exports = {
    
    Index: () => {
        let tasks = db.Task.findAll().then(res => {
            console.log(res);
        });
    },

};
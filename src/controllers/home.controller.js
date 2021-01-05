const {Tag, User, Task} = require("../models/index")
module.exports = {
    index: async (req, res, next) => {
        let today = new Date().getDay()
        const user = await User.findOne({
            where: {
                email: req.session.email,
                is_active: 1,
            },
            include: {model: Task, where: {dayweek: today, deleted_at: null}, required:false},
            order: [['Tasks', "status", "DESC"], ['created_at', 'ASC']]
        })

        let tags = await Tag.findAll()
        let tagsWithTasks
        let completedPercentage = [0, 0]
        let tagsCount = {}

        if (user.Tasks === null || user.Tasks === undefined || user.Tasks.length === 0) {
            user.Tasks = null
            tags = null
        }else{
            user.Tasks.forEach(task => {
                task.status === 1 ? completedPercentage[1]++ : completedPercentage[0]++
                let newtags = [];
                let tasktags = task.tags.split(",")
                task.tags = [];
                for (let i = 0; i < tasktags.length; i++) {
                    const id = tasktags[i];
                    newtags[i] = tags.filter(tag => tag.id == id);
                    (!tagsCount[id]) ? tagsCount[id] = 1 : tagsCount[id]++
                }
                task.tags.push(newtags);
            })
        }
        if(tags !== null) {
            let tagsWithTasks = tags.filter(tag => {
                if (tagsCount[tag.id] > 0) return tag
            })
        }
        res.render("dashboard", {
            title: "Dashboard",
            user: user,
            completedData: completedPercentage,
            tCounter: tagsCount,
            tagsWithTasks: tagsWithTasks,
            tags: tags
        })
    }
};
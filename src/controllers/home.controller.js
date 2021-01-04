const {Tag, User, Task} = require("../models/index")
module.exports = {
    index: async (req, res, next) => {
        let today = new Date().getDay()
        const user = await User.findOne({
            where: { email: req.session.email, is_active: 1},
            include: {model: Task, where: {dayweek: today, deleted_at: null}},
            order: [['Tasks', "status", "DESC"], ['created_at', 'ASC']]
        })
        
        const tags = await Tag.findAll()
        let completedPercentage = [0, 0], tagsCount = {}
        user.Tasks.forEach( task  => {
            task.status === 1 ? completedPercentage[1]++ : completedPercentage[0]++
            let newtags = [] , tasktags = task.tags.split(",")
            task.tags = [];
            for (let i = 0; i < tasktags.length; i++) {
                newtags[i] = tags.filter(tag => tag.id == tasktags[i])
                (! tagsCount[tasktags[i]]) ? tagsCount[tasktags[i]] = 1 : tagsCount[tasktags[i]]++
            }
            task.tags.push(newtags);
        })        

        res.render("dashboard", {
            title: "Dashboard",
            user: user,
            completedData: completedPercentage,
            tCounter: tagsCount,
            tags: tags
        })
    }
};
const {Tag, User, Task} = require("../models/index")
module.exports = {
    
    index: async (req, res, next) => {
        let today = new Date().getDay()
        const user = await User.findOne({
            where: {
                email: req.session.email, 
                is_active: 1,
            },
            include: {model: Task, where: {dayweek: today, deleted_at: null}},
            order: [['Tasks', "status", "DESC"], ['created_at', 'ASC']]
        })
        
        const tags = await Tag.findAll()
        //todo: get daily tasks completation
        //todo: get all tags count (define algorithm)
        user.Tasks.forEach( task  => {
            let newtags = [];
            let tasktags = task.tags.split(",")
            task.tags = [];
            for (let i = 0; i < tasktags.length; i++) {
                const id = tasktags[i];
                newtags[i] = tags.filter(tag => tag.id == id);
            }
            task.tags.push(newtags);
        })        

        res.render("dashboard", {
            title: "Dashboard",
            user: user
        })
    },
};
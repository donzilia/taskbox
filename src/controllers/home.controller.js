const {Tag, User} = require("../models/index")
module.exports = {
    
    index: async (req, res, next) => {
        const user = await User.findOne({where: {email: req.session.email, is_active: 1}, include: "tasks", order: [['tasks', "status", "DESC"], ['created_at', 'ASC']] })
        const tags = await Tag.findAll()

        user.tasks.forEach( task  => {
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
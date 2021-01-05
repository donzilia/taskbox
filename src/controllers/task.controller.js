const {Task, Tag} = require("../models/index")

module.exports = {
    store: async (req, res, next) => {
        let {title, description, tags, weekday, periodicity} = req.body

        let tagsSelected = "";
        if (tags !== undefined) {
            for (let i = 0; i < tags.length; i++) {
                if (isNaN(Number(tags[i]))) {
                    const newTag = await Tag.create({
                        title: tags[i],
                        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
                    })
                    tagsSelected += (i+1 === tags.length) ? `${newTag.id}` : `${newTag.id},`
                }else {
                    tagsSelected += (i+1 === tags.length) ? `${tags[i]}` : `${tags[i]},`
                }
            }
        }

        const newTask = await Task.create({
            title: title,
            description: description,
            dayweek: weekday,
            tags: tagsSelected,
            periodicity_id: periodicity,
            userId: req.session.userId,
            status: 1
        });

        res.redirect("/")
    }
}
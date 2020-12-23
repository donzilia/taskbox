var expect  = require('chai').expect;
const Task = require("../src/models/").Task;

describe("../src/models/web/task.model", () => {
    const instance = new Task();

    it("Task model has correct properties", (done) => {
        expect(instance).to.have.property("id")
        expect(instance).to.have.property("title")
        expect(instance).to.have.property("description")
        expect(instance).to.have.property("tags")
        expect(instance).to.have.property("periodicity_id")
        expect(instance).to.have.property("dayweek")

        done()
    });
});

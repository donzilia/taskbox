var expect  = require('chai').expect;
const User = require("../src/models/").User;

describe("../src/models/web/user.model", () => {
    const instance = new User();

    it("User model has correct properties", (done) => {
        expect(instance).to.have.property("id")
        expect(instance).to.have.property("email")
        expect(instance).to.have.property("fullName")
        expect(instance).to.have.property("profilePic")
        expect(instance).to.have.property("pass")
        expect(instance).to.have.property("is_loggedin")

        done()
    });
});

const { DataTypes } = require('sequelize');
const db = require("../index")
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: DataTypes.STRING,
        fullName: DataTypes.STRING,
        profilePic: DataTypes.STRING,
        pass: DataTypes.STRING,
        is_loggedin: DataTypes.TINYINT,
        is_active: DataTypes.TINYINT,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, { timestamps: false, tableName: "users" });

    User.generateHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
    }

    User.validPassword = (password) => {
        return bcrypt.compareSync(password, this.pass)
    }

    return User;
}
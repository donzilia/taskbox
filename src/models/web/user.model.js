const { DataTypes } = require('sequelize');
const db = require("../index")

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        email: DataTypes.STRING,
        fullName: DataTypes.STRING,
        profilePic: DataTypes.STRING,
        pass: DataTypes.STRING,
        is_loggedin: DataTypes.TINYINT,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, { timestamps: false, tableName: "users" });
    return User;
}
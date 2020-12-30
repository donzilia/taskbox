const { DataTypes } = require('sequelize');
const db = require("../index")

module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: DataTypes.STRING,
        color: DataTypes.STRING,
    },{ timestamps: false, tableName: "tags" })

    return Tag;
}
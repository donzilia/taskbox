const { DataTypes } = require('sequelize');
const db = require("../index")

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        tags: DataTypes.STRING,
        periodicity_id: DataTypes.INTEGER,
        dayweek: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, { timestamps: false, tableName: "tasks" });
    return Task;
}


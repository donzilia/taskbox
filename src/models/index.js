const { mysql } = require("../config/database")
const fs = require("fs")
const path = require('path');
const basename = path.basename(__filename);
const {Sequelize, DataTypes} = require('sequelize');

let db = {}
db["taskbox"] = new Sequelize(mysql.connection, {define: {
    timestamps: false
  }});

fs.readdirSync(__dirname + '/web')
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
        );
    })
    .forEach((file) => {
        var model = require(path.join(__dirname + '/web', file))(db["taskbox"], DataTypes)
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
"use strict";

import { readdirSync } from "fs";
import { join } from "path";
import Sequelize from "sequelize";
const env = "MySQL";
const config = require(join(__dirname, "../", "congig",
    "config.json")) [env];
const sequelize = new Sequelize(config.database, config.username,
    config.password, config);
const db = {};
readdirSync(__dirname)
   .filter((file) => {
       return (file.indexOf(".") !== 0) && (file !== "index.js");
   })
   .forEach((file) => {
       const model = sequelize.import(join(__dirname, file));
       db[model.name] = model;
   });

Object.keys(db) .forEach((modelName) => {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
export default db;
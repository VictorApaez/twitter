import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Sequelize, { DataTypes } from "sequelize";
import configRaw from "../config/config.js";

const env = process.env.NODE_ENV || "development";
const config = configRaw[env];

const db = {};
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const basename = path.basename(filename);

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export async function initializeDatabase() {
  const files = fs
    .readdirSync(dirname)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );

  await Promise.all(
    files.map(async (file) => {
      const module = await import(path.join(dirname, file));
      const model = module.default(sequelize, DataTypes);
      db[model.name] = model;
    })
  );

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
}

export default db;

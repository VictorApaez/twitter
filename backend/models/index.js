import Sequelize, { DataTypes } from "sequelize";
import configRaw from "../config/config.js";

import UserModel from "./User.js";
import PostModel from "./Post.js";
import CommentModel from "./Comment.js";

const env = process.env.NODE_ENV || "development";
const config = configRaw[env];

const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = UserModel(sequelize, DataTypes);
db.Post = PostModel(sequelize, DataTypes);
db.Comment = CommentModel(sequelize, DataTypes);

Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

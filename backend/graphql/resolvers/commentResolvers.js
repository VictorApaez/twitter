import db from "../../models/index.js";
const { Comment } = db;

export default {
  Query: {
    comments: () => Comment.findAll(),
    comment: (_, { id }) => Comment.findByPk(id),
  },
};

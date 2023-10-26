import db from "../../../models/index.js";
const { Comment } = db;

export default {
  Query: {
    comments: () => Comment.findAll(),

    comment: async (_, { id }) => {
      const comment = await Comment.findByPk(id);

      if (!comment) {
        throw new Error("Comment not found");
      }
      return comment;
    },
  },
};

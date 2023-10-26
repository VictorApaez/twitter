import db from "../../../models/index.js";
const { Comment } = db;

export default {
  Comment: {
    replies: async (comment) => {
      const replies = await Comment.findAll({
        where: {
          parentId: comment.id,
        },
      });

      return replies || [];
    },
  },
};

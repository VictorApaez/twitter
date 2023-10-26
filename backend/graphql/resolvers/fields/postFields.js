import db from "../../../models/index.js";
const { Post, Comment } = db;

export default {
  Post: {
    comments: async (post) => {
      return await Comment.findAll({
        where: {
          postId: post.id,
        },
        include: [{ model: Comment, as: "replies", foreignKey: "parentId" }],
      });
    },
  },
};

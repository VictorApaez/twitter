import db from "../../../models/index.js";
const { Post, Comment } = db;

export default {
  // lazy load posts and comments
  User: {
    posts: async (user) => {
      return await Post.findAll({
        where: {
          userId: user.id,
        },
      });
    },
    comments: async (user) => {
      return await Comment.findAll({
        where: {
          userId: user.id,
        },
        include: [{ model: Comment, as: "replies", foreignKey: "parentId" }],
      });
    },
  },
};

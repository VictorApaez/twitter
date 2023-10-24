import db from "../../models/index.js";
const { User, Post, Comment } = db;

export default {
  Query: {
    users: async () => {
      return await User.findAll({
        // display posts and comments data when fetching users
        include: [
          { model: Post, as: "posts" },
          { model: Comment, as: "comments" },
        ],
      });
    },

    user: async (_, { id }) => {
      const user = await User.findByPk(id, {
        include: [
          { model: Post, as: "posts" },
          { model: Comment, as: "comments" },
        ],
      });

      return user;
    },
  },
  // lazy load posts and comments
  User: {
    // field resolvers
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
      });
    },
  },
};

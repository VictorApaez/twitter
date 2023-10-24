import db from "../../models/index.js";
const { Post, Comment } = db;

export default {
  Query: {
    posts: () =>
      Post.findAll({
        include: [{ model: Comment, as: "comments" }],
      }),
    post: (_, { id }) => {
      const post = Post.findByPk(id, {
        include: [{ model: Comment, as: "comments" }],
      });

      return post;
    },
  },
  Post: {
    comments: async (post) => {
      return await Comment.findAll({
        where: {
          postId: post.id,
        },
      });
    },
  },
};

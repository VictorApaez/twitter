import db from "../../../models/index.js";
const { Post, Comment } = db;

export default {
  Query: {
    posts: (parent, args, context, info) => {
      return Post.findAll({
        include: [
          {
            model: Comment,
            as: "comments",
            required: false,
            include: [{ model: Comment, as: "replies", required: false }],
          },
        ],
      });
    },
    post: (_, { id }, context) => {
      const post = Post.findByPk(id, {
        include: [
          {
            model: Comment,
            as: "comments",
            include: [
              { model: Comment, as: "replies", foreignKey: "parentId" },
            ],
          },
        ],
      });

      return post;
    },
  },
};

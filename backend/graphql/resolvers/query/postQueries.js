import db from "../../../models/index.js";
const { Post, Comment } = db;

export default {
  Query: {
    posts: (parent, args, context, info) => {
      console.log(context);
      if (!context.user) {
        throw new Error("You must be authenticated to view posts. :(");
      }

      return Post.findAll({
        include: [
          {
            model: Comment,
            as: "comments",
            where: { parentId: null },
            include: [
              { model: Comment, as: "replies", foreignKey: "parentId" },
            ],
          },
        ],
      });
    },
    post: (_, { id }, context) => {
      if (!context.user) {
        throw new Error("You must be authenticated to view the post.");
      }

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

import db from "../../../models/index.js";
const { Post, Comment } = db;

export default {
  Query: {
    posts: () =>
      Post.findAll({
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
      }),
    post: (_, { id }) => {
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

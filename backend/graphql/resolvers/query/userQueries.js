import db from "../../../models/index.js";
const { User, Post, Comment } = db;

export default {
  Query: {
    users: async () => {
      return await User.findAll({
        include: [
          { model: Post, as: "posts" },
          {
            model: Comment,
            as: "comments",
            include: [
              { model: Comment, as: "replies", foreignKey: "parentId" },
            ],
          },
        ],
      });
    },

    user: async (_, { id }) => {
      const user = await User.findByPk(id, {
        include: [
          { model: Post, as: "posts" },
          {
            model: Comment,
            as: "comments",
            include: [
              { model: Comment, as: "replies", foreignKey: "parentId" },
            ],
          },
        ],
      });

      return user;
    },
  },
};

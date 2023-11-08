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

    userProfile: async (_, { id }) => {
      const user = await User.findByPk(id, {
        attributes: ["id", "displayName", "bio"],
        include: [
          { model: Post, as: "posts" },
          {
            model: Comment,
            as: "comments",
            include: [
              {
                model: Comment,
                as: "replies",
                foreignKey: "parentId",
                attributes: ["id", "content"],
              },
            ],
          },
        ],
      });

      return user;
    },
    myProfile: async (_, args, { authPayload }) => {
      if (!authPayload) {
        throw new Error("You must be authenticated to view your profile.");
      }
      const auth0Id = authPayload.sub;
      const user = await User.findOne({
        where: { auth0Id },
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

      if (!user) {
        throw new Error("User not found.");
      }

      return user;
    },
  },
};

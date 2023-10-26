import db from "../../../models/index.js";
const { User } = db;

export default {
  Mutation: {
    createUser: async (_, { input }) => {
      const user = await User.create(input);
      return user;
    },

    updateUser: async (_, { id, input }) => {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error("User not found");
      }

      await user.update(input);

      return user;
    },

    deleteUser: async (_, { id }) => {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error("User not found");
      }

      await user.destroy();

      return true;
    },
  },
};

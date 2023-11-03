import db from "../../../models/index.js";
const { User } = db;

export default {
  Mutation: {
    createUser: async (_, args, context) => {
      await authenticateUserAction(context.authPayload);

      const auth0Id = context.authPayload.sub;

      let user = await User.findOne({ where: { auth0Id } });

      if (user) {
        throw new Error("User already exists.");
      }

      user = new User({
        auth0Id,
        displayName: args.input.displayName,
        bio: args.input.bio,
      });

      await user.save();

      return user;
    },

    updateUser: async (_, { id, input }, context) => {
      const user = await authenticateUserAction(context.authPayload, id);
      await user.update(input);
      return user;
    },

    deleteUser: async (_, { id }) => {
      const user = await authenticateUserAction(context.authPayload, id);
      await user.destroy();
      return true;
    },
  },
};

async function authenticateUserAction(authPayload, userId) {
  if (!authPayload) {
    throw new Error("You must be authenticated to perform this action.");
  }

  if (userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found.");
    }
    if (authPayload.sub !== user.auth0Id) {
      throw new Error("You are not authorized to perform this action.");
    }
    return user;
  }

  return null;
}

import db from "../../../models/index.js";
import authenticateAndAuthorize from "../authHelper.js";
const { Post, User } = db;

export default {
  Mutation: {
    async createPost(_, { content }, context) {
      if (!context.authPayload) {
        throw new Error("You must be authenticated to create a post.");
      }

      const auth0Id = context.authPayload.sub;

      const user = await User.findOne({ where: { auth0Id } });
      if (!user) {
        throw new Error("User not found.");
      }

      const post = await Post.create({
        userId: user.id,
        content,
      });

      return post;
    },
    async updatePost(_, { postId, content }, context) {
      const post = await authenticateAndAuthorize(
        context.authPayload,
        postId,
        "Post"
      );
      await post.update({ content });
      return post;
    },

    async deletePost(_, { postId }, context) {
      const post = await authenticateAndAuthorize(
        context.authPayload,
        postId,
        "Post"
      );
      await post.destroy();
      return true;
    },
  },
};

import db from "../../../models/index.js";
import authenticateAndAuthorize from "../authHelper.js";
const { Comment, User, Post } = db;

export default {
  Mutation: {
    async createComment(_, { postId, parentId, content }, context) {
      if (!context.authPayload) {
        throw new Error("You must be authenticated to create a comment.");
      }

      const user = await User.findOne({
        where: { auth0Id: context.authPayload.sub },
      });

      if (!user) {
        throw new Error("User not found.");
      }

      const post = await Post.findOne({
        where: { id: postId },
      });

      if (!post) {
        throw new Error("Post not found");
      }

      const comment = await Comment.create({
        postId,
        userId: user.id,
        parentId,
        content,
      });

      return comment;
    },

    async updateComment(_, { id, content }, context) {
      const comment = await authenticateAndAuthorize(
        context.authPayload,
        id,
        "Comment"
      );
      await comment.update({ content });
      return comment;
    },

    async deleteComment(_, { id }, context) {
      const comment = await authenticateAndAuthorize(
        context.authPayload,
        id,
        "Comment"
      );
      await comment.destroy();
      return true;
    },
  },
};

import db from "../../../models/index.js";
const { Comment } = db;

export default {
  Mutation: {
    async createComment(_, { postId, userId, parentId, content }) {
      const comment = await Comment.create({
        postId,
        userId,
        parentId,
        content,
      });
      return comment;
    },

    async updateComment(_, { id, content }) {
      const comment = await Comment.findByPk(id);
      if (!comment) return null;
      await comment.update({ content });
      return comment;
    },

    async deleteComment(_, { id }) {
      const comment = await Comment.findByPk(id);
      if (!comment) return false;
      await comment.destroy();
      return true;
    },
  },
};

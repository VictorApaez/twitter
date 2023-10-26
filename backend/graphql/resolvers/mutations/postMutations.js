import db from "../../../models/index.js";
const { Post } = db;

export default {
  Mutation: {
    async createPost(_, { userId, content }) {
      const post = await Post.create({ userId, content });
      return post;
    },

    async updatePost(_, { id, content }) {
      const post = await Post.findByPk(id);
      if (!post) return null;
      await post.update({ content });
      return post;
    },

    async deletePost(_, { id }) {
      const post = await Post.findByPk(id);
      if (!post) return false;
      await post.destroy();
      return true;
    },
  },
};

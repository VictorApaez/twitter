const { sequelize, User, Post, Comment } = require("../../models");
const generateID = () => Math.floor(Math.random() * 100000).toString();

describe("Associations", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("User should have many Posts", async () => {
    const user = await User.create({
      auth0Id: generateID(),
      displayName: "testUser",
    });
    const post1 = await Post.create({ userId: user.id, content: "Post 1" });
    const post2 = await Post.create({ userId: user.id, content: "Post 2" });

    const posts = await user.getPosts();
    const postIds = posts.map((post) => post.id);
    expect(postIds).toContain(post1.id);
    expect(postIds).toContain(post2.id);
  });

  test("User should have many Comments", async () => {
    const user = await User.create({
      auth0Id: generateID(),
      displayName: "testUser2",
    });
    const post = await Post.create({
      userId: user.id,
      content: "Another post",
    });
    const comment1 = await Comment.create({
      userId: user.id,
      postId: post.id,
      content: "Comment 1",
    });
    const comment2 = await Comment.create({
      userId: user.id,
      postId: post.id,
      content: "Comment 2",
    });

    const comments = await user.getComments();
    const commentIds = comments.map((comment) => comment.id);
    expect(commentIds).toContain(comment1.id);
    expect(commentIds).toContain(comment2.id);
  });

  test("Post should have many Comments", async () => {
    const user = await User.create({
      auth0Id: generateID(),
      displayName: "testUser3",
    });
    const post = await Post.create({
      userId: user.id,
      content: "Yet another post",
    });
    const comment1 = await Comment.create({
      userId: user.id,
      postId: post.id,
      content: "Comment 3",
    });
    const comment2 = await Comment.create({
      userId: user.id,
      postId: post.id,
      content: "Comment 4",
    });

    const comments = await post.getComments();
    const commentIds = comments.map((comment) => comment.id);
    expect(commentIds).toContain(comment1.id);
    expect(commentIds).toContain(comment2.id);
  });

  test("Comment should have many Replies (also Comments)", async () => {
    const user = await User.create({
      auth0Id: generateID(),
      displayName: "testUser4",
    });
    const post = await Post.create({
      userId: user.id,
      content: "Yet another post again",
    });
    const parentComment = await Comment.create({
      userId: user.id,
      postId: post.id,
      content: "Parent comment",
    });
    const reply1 = await Comment.create({
      userId: user.id,
      postId: post.id,
      parentId: parentComment.id,
      content: "Reply 1",
    });
    const reply2 = await Comment.create({
      userId: user.id,
      postId: post.id,
      parentId: parentComment.id,
      content: "Reply 2",
    });

    const replies = await parentComment.getReplies();
    const replyIds = replies.map((reply) => reply.id);
    expect(replyIds).toContain(reply1.id);
    expect(replyIds).toContain(reply2.id);
  });
});

import db from "../../models/index.js";
const { sequelize, User, Post, Comment } = db;

const generateID = () => Math.floor(Math.random() * 100000).toString();

describe("The Comment Model", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("should create a valid comment", async () => {
    const user = await User.create({
      auth0Id: generateID(),
      displayName: "testUser",
    });
    const post = await Post.create({
      userId: user.id,
      content: "Test post.",
    });
    const comment = await Comment.create({
      userId: user.id,
      postId: post.id,
      content: "Parent comment.",
    });
    expect(user).toHaveProperty("id");
    expect(post).toHaveProperty("id");
    expect(comment).toHaveProperty("id");

    expect(comment.id).toBeDefined();
    expect(comment.content).toBe("Parent comment.");
  });

  test("should read (fetch) a comment", async () => {
    const user = await User.create({
      auth0Id: generateID(),
      displayName: "testUser",
    });
    const post = await Post.create({
      userId: user.id,
      content: "Test post.",
    });
    const comment = await Comment.create({
      userId: user.id,
      postId: post.id,
      content: "Parent comment.",
    });
    expect(user).toHaveProperty("id");
    expect(post).toHaveProperty("id");
    expect(comment).toHaveProperty("id");

    const fetchedComment = await Comment.findOne({
      where: { userId: user.id },
    });

    expect(fetchedComment).not.toBeNull();
    expect(fetchedComment.content).toBe("Parent comment.");
  });

  test("should update a comment's content", async () => {
    const user = await User.create({
      auth0Id: generateID(),
      displayName: "testUser",
    });
    const post = await Post.create({
      userId: user.id,
      content: "Test post.",
    });
    const comment = await Comment.create({
      userId: user.id,
      postId: post.id,
      content: "Parent comment.",
    });
    expect(user).toHaveProperty("id");
    expect(post).toHaveProperty("id");
    expect(comment).toHaveProperty("id");

    await comment.update({ content: "Updated test comment." });

    expect(comment).not.toBeNull();
    expect(comment.content).toBe("Updated test comment.");
  });

  test("should delete a comment", async () => {
    const user = await User.create({
      auth0Id: generateID(),
      displayName: "testUser",
    });
    const post = await Post.create({
      userId: user.id,
      content: "Test post.",
    });
    const comment = await Comment.create({
      userId: user.id,
      postId: post.id,
      content: "Parent comment.",
    });
    expect(user).toHaveProperty("id");
    expect(post).toHaveProperty("id");
    expect(comment).toHaveProperty("id");

    await comment.destroy();

    const deletedComment = await Comment.findOne({
      where: { content: "Parent comment." },
    });

    expect(deletedComment).toBeNull();
  });

  test("should delete associated comments when a user is deleted", async () => {
    const user = await User.create({
      auth0Id: generateID(),
      displayName: "testUser",
    });
    const post = await Post.create({
      userId: user.id,
      content: "Test post.",
    });
    const comment = await Comment.create({
      userId: user.id,
      postId: post.id,
      content: "Parent comment.",
    });
    const reply = await Comment.create({
      userId: user.id,
      postId: post.id,
      parentId: comment.id,
      content: "Reply to parent comment.",
    });
    expect(user).toHaveProperty("id");
    expect(post).toHaveProperty("id");
    expect(comment).toHaveProperty("id");
    expect(reply).toHaveProperty("id");

    await user.destroy();
    const deletedComment = await Comment.findByPk(comment.id);
    const deletedReply = await Comment.findByPk(reply.id);
    expect(deletedComment).toBeNull();
    expect(deletedReply).toBeNull();
  });

  test("should delete associated comments when a post is deleted", async () => {
    const user = await User.create({
      auth0Id: generateID(),
      displayName: "testUser",
    });
    const post = await Post.create({
      userId: user.id,
      content: "Test post.",
    });
    const comment = await Comment.create({
      userId: user.id,
      postId: post.id,
      content: "Parent comment.",
    });

    await post.destroy();
    const deletedComment = await Comment.findByPk(comment.id);
    expect(deletedComment).toBeNull();
  });

  test("should delete replies when a parent comment is deleted", async () => {
    const user = await User.create({
      auth0Id: generateID(),
      displayName: "testUser",
    });
    const post = await Post.create({
      userId: user.id,
      content: "Test post.",
    });
    const comment = await Comment.create({
      userId: user.id,
      postId: post.id,
      content: "Parent comment.",
    });
    const reply = await Comment.create({
      userId: user.id,
      postId: post.id,
      parentId: comment.id,
      content: "Reply to parent comment.",
    });
    expect(user).toHaveProperty("id");
    expect(post).toHaveProperty("id");
    expect(comment).toHaveProperty("id");
    expect(reply).toHaveProperty("id");

    await comment.destroy();
    const deletedReply = await Comment.findByPk(reply.id);
    expect(deletedReply).toBeNull();
  });
});

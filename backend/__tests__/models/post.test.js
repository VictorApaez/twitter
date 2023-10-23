const { sequelize, User, Post } = require("../../models");

describe("The Post Model", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("should create a valid post", async () => {
    const user = await User.create({
      auth0Id: "testAuth0Id",
      displayName: "testUser",
    });
    const post = await Post.create({
      userId: user.id,
      content: "This is a test post.",
    });

    expect(post.id).toBeDefined();
    expect(post.userId).toBe(user.id);
    expect(post.content).toBe("This is a test post.");
  });

  test("should not create a post without a userId", async () => {
    await expect(
      Post.create({ content: "This post has no user." })
    ).rejects.toThrow();
  });

  test("should not create a post without content", async () => {
    const user = await User.create({
      auth0Id: "testAuth0Id",
      displayName: "testUser",
    });
    await expect(Post.create({ userId: user.id })).rejects.toThrow();
  });

  test("should list all posts", async () => {
    const user = await User.create({
      auth0Id: "uniqueAuth0Id",
      displayName: "testUserForListing",
    });

    await Post.create({ userId: user.id, content: "Test post 1." });
    await Post.create({ userId: user.id, content: "Test post 2." });

    const posts = await Post.findAll();

    expect(posts).toHaveLength(2);
    expect(posts[0].content).toBe("Test post 1.");
    expect(posts[1].content).toBe("Test post 2.");
  });

  test("should delete a post", async () => {
    const user = await User.create({
      auth0Id: "deleteTestAuth0Id",
      displayName: "deleteTestUser",
    });

    const post = await Post.create({
      userId: user.id,
      content: "Post to be deleted.",
    });

    await Post.destroy({
      where: {
        id: post.id,
      },
    });

    const fetchedPost = await Post.findOne({
      where: {
        id: post.id,
      },
    });

    expect(fetchedPost).toBeNull();
  });

  test("should cascade delete posts when user is deleted", async () => {
    const user = await User.create({
      auth0Id: "cascadeDeleteAuth0Id",
      displayName: "cascadeDeleteUser",
    });

    await Post.create({
      userId: user.id,
      content: "Post 1",
    });

    await Post.create({
      userId: user.id,
      content: "Post 2",
    });

    await User.destroy({
      where: {
        id: user.id,
      },
    });

    const userPosts = await Post.findAll({
      where: {
        userId: user.id,
      },
    });

    expect(userPosts).toHaveLength(0);
  });
});

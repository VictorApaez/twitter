import db from "../../../models/index.js";
import resolvers from "../../../graphql/resolvers/userResolvers.js";
const { Comment, User, Post } = db;
const { users, user } = resolvers.Query;
import { generateID } from "../../../utils/helpers.js";

describe("users resolvers", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const userTest = await User.create({
      auth0Id: generateID(),
      displayName: "testUser",
    });
    const postTest = await Post.create({
      userId: userTest.id,
      content: "Test post.",
    });
    const commentTest = await Comment.create({
      userId: userTest.id,
      postId: postTest.id,
      content: "Sample Comment",
    });
    const replyTest = await Comment.create({
      userId: userTest.id,
      postId: postTest.id,
      parentId: commentTest.id,
      content: "Reply to parent comment.",
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  it("returns all users with their posts and comments", async () => {
    const result = await users();
    expect(result).toHaveLength(1);
    expect(result[0].posts).toHaveLength(1);
    expect(result[0].comments).toHaveLength(2); // comment + reply
  });

  it("returns a single user by id with posts and comments", async () => {
    const result = await user(null, { id: 1 });

    expect(result).toBeTruthy();
    expect(result.posts).toHaveLength(1);
    expect(result.comments).toHaveLength(2); // comment + reply
  });
});

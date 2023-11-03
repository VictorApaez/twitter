import db from "../../../models/index.js";
import resolvers from "../../../graphql/resolvers/query/postQueries.js";
const { Comment, User, Post } = db;
const { post, posts } = resolvers.Query;
import { generateID } from "../../../utils/helpers.js";

describe("post resolvers", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });

    // Sample post creation
    const user1 = await User.create({
      auth0Id: generateID(),
      displayName: "testUser",
    });
    const post1 = await Post.create({
      userId: user1.id,
      content: "Test post.",
    });
    const comment1 = await Comment.create({
      userId: user1.id,
      postId: post1.id,
      content: "Sample Comment",
    });
    const reply = await Comment.create({
      userId: user1.id,
      postId: post1.id,
      parentId: comment1.id,
      content: "Reply to parent comment.",
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  it("returns all posts with their comments and replies", async () => {
    const result = await posts();
    expect(result).toHaveLength(1);
    expect(result[0].comments).toHaveLength(2);
  });

  it("returns a single post by id with comments and replies", async () => {
    const result = await post(null, { id: 1 });
    expect(result.id).toEqual(1);
    expect(result.comments).toHaveLength(2);
  });

  it("returns null for a non-existent post", async () => {
    const result = await post(null, { id: 99 });
    expect(result).toBeNull();
  });
});

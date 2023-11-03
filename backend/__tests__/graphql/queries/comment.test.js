import db from "../../../models/index.js";
import resolvers from "../../../graphql/resolvers/query/commentQueries.js";
const { Comment, User, Post } = db;
const { comment } = resolvers.Query;
import { generateID } from "../../../utils/helpers.js";

describe("comment resolver", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const user = await User.create({
      auth0Id: generateID(),
      displayName: "testUser",
    });
    const post = await Post.create({
      userId: user.id,
      content: "Test post.",
    });
    const comment1 = await Comment.create({
      userId: user.id,
      postId: post.id,
      content: "Sample Comment",
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  it("returns a single comment", async () => {
    const result = await comment(null, { id: 1 });
    expect(result.content).toEqual("Sample Comment");
  });

  it("throws an error for a non-existent comment", async () => {
    await expect(comment(null, { id: 99 })).rejects.toThrow(
      "Comment not found"
    );
  });
});

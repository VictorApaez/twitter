import db from "../../models/index.js";
const { sequelize, User } = db;

describe("The User Model", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });
  afterEach(async () => {
    await User.destroy({ where: {} });
  });

  it("should create a new user", async () => {
    const user = await User.create({
      auth0Id: "testAuth0Id",
      displayName: "testUser",
    });

    expect(user.auth0Id).toBe("testAuth0Id");
    expect(user.displayName).toBe("testUser");
  });

  it("should not allow creating two users with the same auth0Id", async () => {
    const userData = {
      auth0Id: "uniqueId",
      displayName: "John Doe",
    };

    const user = await User.create(userData);

    await expect(User.create(userData)).rejects.toThrow();
  });

  it("should not allow creating a user without displayName", async () => {
    const userData = {
      auth0Id: "anotherUniqueId",
    };

    await expect(User.create(userData)).rejects.toThrow();
  });

  it("should allow creating a user without a bio", async () => {
    const userData = {
      auth0Id: "thirdUniqueId",
      displayName: "Jane Doe",
    };

    const user = await User.create(userData);

    expect(user.id).toBeTruthy();
    expect(user.bio).toBeUndefined();
  });

  it("should auto-increment the ID when creating multiple users", async () => {
    const user1 = await User.create({
      auth0Id: "testId1",
      displayName: "Test User 1",
    });

    const user2 = await User.create({
      auth0Id: "testId2",
      displayName: "Test User 2",
    });

    expect(user2.id).toBe(user1.id + 1);
  });

  it("should update a user's details and persist the changes", async () => {
    const user = await User.create({
      auth0Id: "id",
      displayName: "Original Name",
      bio: "Original Bio",
    });

    user.displayName = "Updated Name";
    user.bio = "Updated Bio";
    await user.save();

    const updatedUser = await User.findByPk(user.id);

    expect(updatedUser.displayName).toBe("Updated Name");
    expect(updatedUser.bio).toBe("Updated Bio");
  });
});

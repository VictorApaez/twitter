"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Seed Posts
      const posts = await queryInterface.bulkInsert(
        "posts",
        [
          {
            content: "Content1",
            userId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            content: "Content2",
            userId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            content: "Content3",
            userId: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            content: "Content4",
            userId: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { returning: true }
      );

      // Seed Comments
      await queryInterface.bulkInsert("comments", [
        {
          content: "Comment1",
          userId: 2,
          postId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "Comment2",
          userId: 3,
          postId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "Comment3",
          userId: 4,
          postId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "Comment4",
          userId: 5,
          postId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error during migration:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Undo seeding
      await queryInterface.bulkDelete("comments", null, {});
      await queryInterface.bulkDelete("posts", null, {});
    } catch (error) {
      console.error("Error during migration rollback:", error);
    }
  },
};

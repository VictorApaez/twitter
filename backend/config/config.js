module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    database: "test_database",
    dialect: "sqlite",
    storage: `./__tests__/test_database.db`,
  },

  production: {},
};

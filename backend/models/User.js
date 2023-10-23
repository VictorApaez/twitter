export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      auth0Id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: "userId",
      as: "posts",
    });

    User.hasMany(models.Comment, {
      foreignKey: "userId",
      as: "comments",
    });
  };

  return User;
};

require("dotenv").config();
const db = require("./models");

console.log(db.User);

db.User.findAll()
  .then((users) => {
    users.forEach((user) => {
      console.log(user.toJSON());
    });
  })
  .catch((err) => {
    console.error("Error retrieving users:", err);
  })
  .finally(() => {
    db.sequelize.close();
  });

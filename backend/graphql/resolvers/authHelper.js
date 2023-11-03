import db from "../../models/index.js";

async function authenticateAndAuthorize(authPayload, itemId, modelName) {
  if (!authPayload) {
    throw new Error("You must be authenticated to perform this action.");
  }

  const Model = db[modelName];
  if (!Model) {
    throw new Error(`The model ${modelName} does not exist.`);
  }
  const item = await Model.findByPk(itemId, {
    include: [
      {
        model: db.User,
        as: "user",
        attributes: ["auth0Id"],
      },
    ],
  });

  if (!item) {
    throw new Error(`${modelName} not found.`);
  }

  if (!item.user) {
    throw new Error(`${modelName} author not found.`);
  }

  if (authPayload.sub !== item.user.auth0Id) {
    throw new Error(
      `You are not authorized to perform this action on this ${modelName.toLowerCase()}.`
    );
  }

  return item;
}

export default authenticateAndAuthorize;

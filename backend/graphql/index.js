import fs from "fs";
import path from "path";
import { mergeTypeDefs } from "@graphql-tools/merge";

//user resolvers
import userFields from "./resolvers/fields/userFields.js";
import userMutation from "./resolvers/mutations/userMutations.js";
import userQuery from "./resolvers/query/userQueries.js";

//post resolvers
import postFields from "./resolvers/fields/postFields.js";
import postQueries from "./resolvers/query/postQueries.js";
import postMutations from "./resolvers/mutations/postMutations.js";

//comment resolvers
import commentFields from "./resolvers/fields/commentFields.js";
import commentQueries from "./resolvers/query/commentQueries.js";
import commentMutations from "./resolvers/mutations/commentMutations.js";

import pkg from "lodash";
const { merge } = pkg;

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const typesDir = path.join(__dirname, "types");

// Load all .graphql files in the types directory
const typeFiles = fs
  .readdirSync(typesDir)
  .filter((file) => file.endsWith(".graphql"));

// Read the content of each file
const typeDefsArray = typeFiles.map((file) =>
  fs.readFileSync(path.join(typesDir, file), "utf-8")
);

// Merge type definitions
const typeDefs = mergeTypeDefs(typeDefsArray);
const resolvers = merge(
  userFields,
  userMutation,
  userQuery,
  postFields,
  postQueries,
  postMutations,
  commentFields,
  commentQueries,
  commentMutations
);

export { typeDefs, resolvers };

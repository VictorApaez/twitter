import fs from "fs";
import path from "path";
import { mergeTypeDefs } from "@graphql-tools/merge";

import userResolvers from "./resolvers/userResolvers.js";
import postResolvers from "./resolvers/postResolvers.js";
import commentResolvers from "./resolvers/commentResolvers.js";
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
const resolvers = merge(userResolvers, postResolvers, commentResolvers);

export { typeDefs, resolvers };

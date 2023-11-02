import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql/index.js";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const client = jwksClient({
  jwksUri: `https://dev-q0lfml8y40meyltz.us.auth0.com/.well-known/jwks.json`,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      return callback(err);
    }

    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    req.user = null;
    return next();
  }

  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(
    token,
    getKey,
    {
      audience: "https://mygraphqlapi.example.com/", // AKA identifier
      issuer: `https://dev-q0lfml8y40meyltz.us.auth0.com/`, // AKA Domain
      algorithms: ["RS256"],
    },
    (err, decoded) => {
      if (err) {
        req.user = null;
        return next();
      }
      req.user = decoded;
      return next();
    }
  );
}

app.use(authenticate);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      user: req.user,
    };
  },
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startApolloServer();

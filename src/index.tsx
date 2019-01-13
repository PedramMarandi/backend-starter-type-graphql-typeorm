import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema, formatArgumentValidationError } from "type-graphql";
import { createConnection } from "typeorm";
import jwt from "express-jwt";
import * as dotenv from "dotenv";
dotenv.config();

import { RegisterResolver } from "./modules/User/Register";
import { LoginResolver } from "./modules/User/Login";
import { MeResolver } from "./modules/User/Me";
// import { customAuthChecker } from "./utils/customAuthChecker";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, MeResolver]
    // authChecker: customAuthChecker
  });

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req }: any) => {
      const context = {
        req,
        user: req.user
      };
      return context;
    }
  });

  const app = Express();
  const path = "/graphql";
  const PORT = process.env.PORT || 4000;

  const authMiddleware = jwt({
    secret: process.env.JWT_SECRET || "x5sd767csfs7812bg",
    credentialsRequired: false
  });

  app.use(path, authMiddleware);

  apolloServer.applyMiddleware({ app, path });
  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};

main();

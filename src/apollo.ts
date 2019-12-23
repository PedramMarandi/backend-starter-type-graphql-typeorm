import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { RegisterResolver } from "./graphl-resolvers/User/Register";
import { LoginResolver } from "./graphl-resolvers/User/Login";
import { MeResolver } from "./graphl-resolvers/User/Me";

export default async (app: any) => {
    const path = "/graphql";
    const schema = await buildSchema({
        resolvers: [RegisterResolver, LoginResolver, MeResolver]
    });
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }: any) => {
            return {
                req,
                user: null //TODO: replace with auth
            };
        }
    });

    await apolloServer.applyMiddleware({ app: app, path });
    return apolloServer;
};
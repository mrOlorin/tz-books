import "reflect-metadata";
import {createConnection} from "typeorm";
import {ApolloServer} from "apollo-server";
import {buildSchema} from "type-graphql";
import {AuthorResolver} from "./resolvers/AuthorResolver";
import {BookResolver} from "./resolvers/BookResolver";

export default async () => {
    await createConnection();
    const schema = await buildSchema({
        resolvers: [AuthorResolver, BookResolver],
    });
    const server = new ApolloServer({schema});
    await server.listen(4000);
    console.log('Server has started.');
};

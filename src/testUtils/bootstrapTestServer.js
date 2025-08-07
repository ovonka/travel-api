import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from '../../src/graphql/index.js';

export async function createTestServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 0 }, // let OS choose an available port, avoiding conflicts
  });``

  return { url  };
}
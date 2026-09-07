import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema";
import resolvers from "./resolvers";

//create a gql server using schema and resolvers
const server = new ApolloServer({ typeDefs, resolvers });
async function startServer() {
  const { url } = await startStandaloneServer(server);
  console.log(`Server successfully running at ${url}`);
}
startServer();

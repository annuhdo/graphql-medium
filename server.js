const { GraphQLServer } = require("graphql-yoga");
const { typeDefs } = require("./src/typeDefs");
const { resolvers } = require("./src/resolvers");

const options = {
  port: 7778
};
const server = new GraphQLServer({ typeDefs, resolvers, options });
server.start(() =>
  console.log(`🚀 Server is running on port: ${options.port}`)
);

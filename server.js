require("babel-polyfill");
const { GraphQLServer } = require("graphql-yoga");
const { typeDefs } = require("./src/typeDefs");
const { resolvers } = require("./src/resolvers");
const { getMediumFeed } = require("./src/connection");
const DataLoader = require("dataloader");

const feedLoader = new DataLoader(
  async keys =>
    await Promise.all(keys.map(async key => await getMediumFeed(key)))
);

const context = {
  feedLoader
};

const options = {
  port: 7778
};

const server = new GraphQLServer({ typeDefs, resolvers, context, options });
server.start(() =>
  console.log(`🚀 Server is running on port: ${options.port}`)
);

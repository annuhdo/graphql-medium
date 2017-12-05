const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");

const app = express();

app.use(
  "/graphiql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = 7777;
app.listen(PORT);
console.log(`🚀 Listening on port ${PORT}`);

const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const app = express();
const mongoose = require("mongoose");
const { mongocon } = process.env;

//connect to mongo
mongoose.connect(mongocon);
mongoose.connection.once("open", () => console.log("Connected to database"));
// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    // pass in a schema property
    schema,
    graphiql: true
  })
);

app.listen(3000, () => {
  console.log("now listening for requests on port 3000");
});

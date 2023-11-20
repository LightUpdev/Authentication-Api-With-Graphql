import express from "express";
import cors from "cors";
import Dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema } from "graphql";
import { mutations } from "./handlers/mutations.js";
import { RootQuery } from "./queries/index.js";
import mongoose from "mongoose";

Dotenv.config();
// create new instance of express class
const app = express();
app.use(cors());

const schema = new GraphQLSchema({ query: RootQuery, mutation: mutations });
app.use("/auth", graphqlHTTP({ schema, graphiql: true }));

const PORT = 5100 || process.env.PORT;

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    return new Error(err.message);
  });

import express from "express";
import cors from "cors";
import Dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";

Dotenv.config();
// create new instance of express class
const app = express();
app.use(cors());
app.use("/auth", graphqlHTTP({ schema: {}, graphiql: true }));

const PORT = 5100 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

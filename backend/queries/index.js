import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from "graphql";
import { userType } from "../schema/index.js";
import { User } from "../Model/index.js";

export const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    // get all users
    users: {
      type: new GraphQLList(userType),
      async resolve() {
        return await User.find();
      },
    },
    user: {
      type: userType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      async resolve(parent, { id }) {
        const existingUser = await User.findById(id);
        if (!existingUser) {
          return new Error("User not found");
        }
        return existingUser;
      },
    },
  },
});

import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { userType } from "../schema/index.js";
import { User } from "../Model/index.js";
import CryptoJS from "crypto-js";

export const mutations = new GraphQLObjectType({
  name: "mutations",
  fields: {
    signUp: {
      type: userType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { name, email, password, username, phoneNumber }) {
        try {
          // validate email
          const emailRegex = new RegExp(
            /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
            "gm"
          );
          const isValidEmail = emailRegex.test(email);
          if (!isValidEmail) {
            return new Error("Invalid email");
          }

          //   validate password
          let passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/;
          const isValidPassword = passwordRegex.test(password);

          if (!isValidPassword) {
            return new Error(
              "password must contain 8 alphanumeric characters with symbols"
            );
          }
          var encryptedPassword = CryptoJS.AES.encrypt(
            password,
            process.env.SECRET_KEY
          ).toString();

          // check if user already exists
          if (isValidEmail && isValidPassword && encryptedPassword) {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
              return new Error("User already exists please login");
            }
            const newUser = new User({
              name,
              email,
              password: encryptedPassword,
              username,
              phoneNumber,
            });
            return await newUser.save();
          }
        } catch (error) {
          return new Error(error.message);
        }
      },
    },
    login: {
      type: userType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { email, password }) {
        try {
          // check if user exist
          const existingUser = await User.findOne({ email });
          // validate email
          const emailRegex = new RegExp(
            /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
            "gm"
          );
          const isValidEmail = emailRegex.test(email);
          if (!isValidEmail) {
            return new Error("Invalid email");
          }

          //   validate password
          var decryptedPassword = CryptoJS.AES.decrypt(
            existingUser.password,
            process.env.SECRET_KEY
          );
          var originalText = decryptedPassword.toString(CryptoJS.enc.Utf8);
          // check if password match with decrypted password
          if (originalText === password) {
            let regex =
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
            const isValidPassword = regex.test(originalText);

            if (!isValidPassword) {
              return new Error(
                "password must contain alphanumeric characters and symbols"
              );
            }
            if (isValidPassword && isValidEmail && decryptedPassword) {
              const loginUser = await User.findOne({ email });
              return loginUser;
            }
          }else{
            return new Error("Invalid password")
          }
        } catch (error) {
          return new Error(error);
        }
      },
    },
  },
});

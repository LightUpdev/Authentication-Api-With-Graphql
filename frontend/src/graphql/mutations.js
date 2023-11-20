import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp(
    $name: String!
    $email: String!
    $password: String!
    $username: String!
    $phoneNumber: String!
  ) {
    signUp(
      name: $name
      email: $email
      password: $password
      username: $username
      phoneNumber: $phoneNumber
    ) {
      id
      name
      email
      username
      phoneNumber
    }
  }
`;

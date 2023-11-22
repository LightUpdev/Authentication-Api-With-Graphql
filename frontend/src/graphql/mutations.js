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
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      username
      phoneNumber
    }
  }
`;

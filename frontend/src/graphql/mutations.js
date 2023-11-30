import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $username: String!
    $phoneNumber: String!
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      username: $username
      phoneNumber: $phoneNumber
    ) {
      id
      firstName
      lastName
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
      firstName
      lastName
      email
      username
      phoneNumber
    }
  }
`;

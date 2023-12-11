import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($userId: ID!) {
    addFriend(userId: $userId) {
      _id
      user {
        _id
        username
        email
      }
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation createGroup($name: String!, $memberIds: [ID!]!) {
    createGroup(name: $name, memberIds: $memberIds) {
      _id
      name
      members {
        _id
        username
        email
      }
    }
  }
`;

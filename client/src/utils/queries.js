import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_CHATS = gql`
  query chats {
    chats {
      _id
      chatName
      users {
        _id
        username
      }
      groupAdmin {
        _id
        username
      }
    }
  }
`;

export const QUERY_CHAT = gql`
  query chat($chatId: ID!) {
    chat(chatId: $chatId) {
      _id
      chatName
      users {
        _id
        username
      }
      groupAdmin {
        _id
        username
      }
    }
  }
`;

export const QUERY_MESSAGES = gql`
  query messages($chatId: ID!) {
    messages(chatId: $chatId) {
      _id
      content
      sender {
        _id
        username
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsersExceptMe {
    getAllUsersExceptMe {
      username
    }
  }
`;
export const SEARCH_USERS = gql`
  query SearchUsers($username: String!) {
    searchUsers(username: $username) {
      username
    }
  }
`;
export const ADD_FRIEND = gql`
  mutation addFriend($username: String!) {
    addFriend(username: $username) {
      _id
      username
      email
      friends {
        _id
        username
      }
    }
  }
`;


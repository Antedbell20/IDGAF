import { gql } from '@apollo/client';

// const createMutation = (name, args, fields) => gql`
//   mutation ${name}(${args}) {
//     ${name}(${args.split(', ').map(arg => arg.split(':')[0]).join(', ')}) {
//       ${fields}
//     }
//   }
// `;

// export const SIGNUP = createMutation('signup', '$username: String!, $email: String!, $password: String!', '_id\nusername\nemail');
// export const LOGIN = createMutation('login', '$email: String!, $password: String!', '_id\nusername\nemail');
// export const ADD_FRIEND = createMutation('addFriend', '$userId: ID!', '_id\nuser {\n_id\nusername\nemail\n}');
// export const CREATE_GROUP = createMutation('createGroup', '$name: String!, $memberIds: [ID!]!', '_id\nname\nmembers {\n_id\nusername\nemail\n}');

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const SEND_MESSAGE = gql`
  mutation sendMessage($content: String!, $chatId: ID!) {
    sendMessage(content: $content, chatId: $chatId) {
      _id
      content
      sender {
        _id
        username
      }
    }
  }
`;


export const GET_MESSAGES = gql`
  query GetMessages($chatId: ID!) {
    getMessages(chatId: $chatId) {
      _id
      content
      sender {
        _id
        username
      }
      createdAt
    }
  }
`;

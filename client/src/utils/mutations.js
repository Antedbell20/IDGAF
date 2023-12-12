import { gql } from '@apollo/client';

const createMutation = (name, args, fields) => gql`
  mutation ${name}(${args}) {
    ${name}(${args.split(', ').map(arg => arg.split(':')[0]).join(', ')}) {
      ${fields}
    }
  }
`;

export const SIGNUP = createMutation('signup', '$username: String!, $email: String!, $password: String!', '_id\nusername\nemail');
export const LOGIN = createMutation('login', '$email: String!, $password: String!', '_id\nusername\nemail');
export const ADD_FRIEND = createMutation('addFriend', '$userId: ID!', '_id\nuser {\n_id\nusername\nemail\n}');
export const CREATE_GROUP = createMutation('createGroup', '$name: String!, $memberIds: [ID!]!', '_id\nname\nmembers {\n_id\nusername\nemail\n}');

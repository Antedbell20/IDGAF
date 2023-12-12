const { gql } = require('apollo-server');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    friends: [User]
    profilePic: String
}

type Chat {
    _id: ID
    chatName: String
    isGroupChat: Boolean
    users: [User]
    latestMessage: Message
    groupAdmin: User
    groupPic: String
}

type Message {
    _id: ID
    content: String
    attachment: String
    sender: User
    chat: Chat
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
    chats: [Chat]
    chat(chatId: ID!): Chat
    messages(chatId: ID!): [Message]
}

type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
    createChat(chatName: String!, users: [ID!]!): Chat
    sendMessage(content: String!, chatId: ID!): Message
    updateChat(chatId: ID!, chatName: String, groupPic: String): Chat
    addUsersToChat(chatId: ID!, users: [ID!]!): Chat
    removeUserFromChat(chatId: ID!, userId: ID!): Chat
}

schema {
    query: Query
    mutation: Mutation
}
`;

module.exports = typeDefs;

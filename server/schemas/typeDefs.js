const { gql } = require('apollo-server');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    Friends: [User]
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
    getFriends: [User]
    getAllUsersExceptMe: [User]
    findFriendByUsername(username: String!): User
    getChatHistoryWithUser(username: String!): [Message]
     searchUsersByUsername(username: String!): [User]

}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(username: String!): User
    removeFriend(friendId: ID!): User
    createChat(chatName: String!, users: [ID!]!): Chat
    sendMessage(content: String!, chatId: ID!): Message
    updateChat(chatId: ID!, chatName: String, groupPic: String): Chat
    addUsersToChat(chatId: ID!, users: [ID!]!): Chat
    removeUserFromChat(chatId: ID!, userId: ID!): Chat
    getMessages(chatId: ID!): Message
    sendMessageToUser(username: String!, content: String!): Message

}

schema {
    query: Query
    mutation: Mutation
}
`;

module.exports = typeDefs;

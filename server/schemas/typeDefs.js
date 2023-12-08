const typeDefs = `
type User {
    _id: ID
    username: String
    friends: [Friend]
}
type Friend {
    _id: ID
    username: String
}
type Auth {
    token: ID!
    user: User
}
type Query {
    me: User
    users: [User]
    user(username: String!): User
}
type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    updateFriend(friendId: ID!, friendName: String!): User
    removeFriend(friendId: ID!): User
}
`;

module.exports = typeDefs;
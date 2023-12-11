const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('User needs to be signed in');
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Wrong credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    sendMessage: async (_, {text,recipientId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: text }},
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('User needs to be signed in');
    },
    
    addFriend: async (_, { friendId }, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { friends: friendId } },  // Assuming friends is an array of user IDs
          { new: true }
        ).populate('friends');
        return user;
      }
      throw new AuthenticationError('User needs to be signed in');
    },
    removeFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: friendId }},
          { new: true }
        ).populate('friends');
       
        return updatedUser;
      }
      throw new AuthenticationError('User needs to be signed in');
    },
  },
};

module.exports = resolvers;

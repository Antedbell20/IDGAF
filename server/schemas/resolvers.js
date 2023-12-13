const { AuthenticationError } = require('apollo-server-express');
const { User, Message, Chat } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      return await User.findById(context.user._id).populate('friends');
    },
    users: async () => {
      return await User.find({});
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username });
    },
    chats: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      return await Chat.find({ users: { $in: [context.user._id] } }).populate('users');
    },
    chat: async (parent, { chatId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      return await Chat.findById(chatId).populate('users');
    },
    messages: async (parent, { chatId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      return await Message.find({ chat: chatId }).populate('sender');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('User Not Found');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addFriend: async (parent, { friendId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      return await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { friends: friendId } },
        { new: true }
      ).populate('friends');
    },
    removeFriend: async (parent, { friendId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      return await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { friends: friendId } },
        { new: true }
      ).populate('friends');
    },
    createChat: async (parent, { chatName, users }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      const chat = await Chat.create({ chatName, users, groupAdmin: context.user._id });
      return chat.populate('users');
    },
    sendMessage: async (parent, { content, chatId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      const message = await Message.create({
        content,
        chat: chatId,
        sender: context.user._id
      });
      await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });
      return message.populate('sender');
    },
    
  },
};

module.exports = resolvers;

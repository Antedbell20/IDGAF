// const { AuthenticationError } = require('apollo-server-express');
const { User, Message, Chat } = require('../models');

const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
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
        throw AuthenticationError
      }
      return await Chat.find({ users: { $in: [context.user._id] } }).populate('users');
    },
    chat: async (parent, { chatId }, context) => {
      if (!context.user) {
        throw AuthenticationError
      }
      return await Chat.findById(chatId).populate('messages');
    },
    messages: async (parent, { chatId }, context) => {
      if (!context.user) {
        throw AuthenticationError
      }
      return await Message.find({ chat: chatId }).populate('sender');
    },
      getFriends: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }

      // Fetch the current user with populated friends list
      const userWithFriends = await User.findById(context.user._id).populate('Friends');
      if (!userWithFriends) {
        throw new Error('User not found');
      }

      return userWithFriends.Friends;
    },
    getAllUsersExceptMe: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('Not authenticated');
            }

            const allUsers = await User.find({ _id: { $ne: context.user._id } });
            return allUsers;
        },
           findFriendByUsername: async (parent, { username }, context) => {
            if (!context.user) {
                throw new AuthenticationError('Not authenticated');
            }

            // Fetch the current user with populated friends list
            const userWithFriends = await User.findById(context.user._id).populate('Friends');
            if (!userWithFriends) {
                throw new Error('User not found');
            }

            // Find and return the friend with the given username
            const friend = userWithFriends.Friends.find(f => f.username === username);
            if (!friend) {
                throw new Error('Friend not found');
            }

            return friend;
        },
        user: async (parent, { username }) => {
         return await User.findOne({ username }).populate('friends'); // Populate the friends field
},
         getChatHistoryWithUser: async (parent, { username }, context) => {
            if (!context.user) {
                throw new AuthenticationError('Not authenticated');
            }

            // Find the target user by username
            const targetUser = await User.findOne({ username: username });
            if (!targetUser) {
                throw new Error('User not found');
            }

            // Fetch the chat history
            const chatHistory = await Message.find({
                $or: [
                    { sender: context.user._id, receiver: targetUser._id },
                    { sender: targetUser._id, receiver: context.user._id }
                ]
            }).populate('sender receiver'); // Adjust populate as necessary

            return chatHistory;
        },
        searchUsersByUsername: async (parent, { username }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      
      // Search for users by username, excluding the current user
      const users = await User.find({
        username: { $regex: username, $options: 'i' }, // case-insensitive search
        _id: { $ne: context.user._id }
      });

      return users;
    }
   
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
        throw AuthenticationError
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError
      }
      const token = signToken(user);
      return { token, user };
    },



    
addFriend: async (parent, { username }, context) => {
    if (!context.user) {
        throw new AuthenticationError('Not authenticated');
    }

    console.log('Authenticated user:', context.user.username); // Debugging
    console.log('Trying to add friend:', username); // Debugging

    // Find the friend user by their username
    const friend = await User.findOne({ username: username });
    if (!friend) {
        throw new Error('User not found');
    }

    console.log('Found friend:', friend.username); // Debugging

    // Ensure that users are not trying to add themselves
    if (context.user._id === friend._id) {
        throw new Error('Cannot add yourself as a friend');
    }

    // Add the friend's ID to the current user's friends list
    const updatedUser = await User.findByIdAndUpdate(
=======
    addFriend: async (parent, { friendId }, context) => {
      if (!context.user) {
        throw AuthenticationError
      }
      return await User.findByIdAndUpdate(

        context.user._id,
        { $addToSet: { Friends: friend._id } },
        { new: true }
    ).populate('Friend');

    if (!updatedUser) {
        throw new Error('User update failed');
    }

    return updatedUser;
},

    removeFriend: async (parent, { friendId }, context) => {
      if (!context.user) {
        throw AuthenticationError
      }
      return await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { friends: friendId } },
        { new: true }
      ).populate('friends');
    },
    createChat: async (parent, { chatName, users }, context) => {
      if (!context.user) {
        throw AuthenticationError
      }
      const chat = await Chat.create({ chatName, users, groupAdmin: context.user._id });
      return chat.populate('users');
    },
    sendMessage: async (parent, { content, chatId }, context) => {
      if (!context.user) {

        throw AuthenticationError
      }
      console.log("================");
      console.log(context.user._id);
      console.log(chatId);
      const message = await Message.create({
        content,
        chat: chatId,
        sender: context.user._id
      });
      console.log("-----------------------------");
      await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id })
      console.log("xxxxxxxxxxxxxxxxxxxx");
      return message.populate('sender');
    },

    getMessages: async (parent,{chatId},context)=>{
      const currentChatId = new ObjectId("507f1f77bcf86cd799439021");
      const message = await Message.findById({currentChatId});
      return message;
    },
    sendMessageToUser: async (parent, { username, content }, context) => {
            if (!context.user) {
                throw new AuthenticationError('Not authenticated');
            }

            // Find the target user by username
            const receiver = await User.findOne({ username: username });
            if (!receiver) {
                throw new Error('User not found');
            }

            // Create a new message
            const message = await Message.create({
                content,
                sender: context.user._id, // Sender is the current authenticated user
                receiver: receiver._id   // Receiver is the found user
            });

            return message;
        }
 



  },
};

module.exports = resolvers;

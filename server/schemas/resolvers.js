const {Chat, Message, User} = require('../models');
const { signToken, AuthenticationError} = require('../utils/auth');
const stripe = require('stripe')("sk_test_51JQ4Q");

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        prodec
    }
}
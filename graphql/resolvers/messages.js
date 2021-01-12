const { Message, User } = require('../../models');
const { UserInputError, AuthenticationError } = require('apollo-server');

module.exports = {
    Mutation: {
        sendMessage: async (parent, { to, content }, { user }) => {
            try {
                if (!user) throw new AuthenticationError('Unauthenticated')

                const recipient = await User.findOne({ where: { username: to } });

                if (!recipient) {
                    throw new UserInputError('User not found!');
                } else if (recipient.username === user.username) {
                    throw new UserInputError('You cant message yourself');
                }
                if (content.trim() === '') {
                    throw new UserInputError('Message is empty!');
                }

                const message = await Message.create({
                    from: user.username,
                    to,
                    content,
                })

                return message;
            } catch (error) {
                console.log(error);
                throw error
            }
        }
    }
};
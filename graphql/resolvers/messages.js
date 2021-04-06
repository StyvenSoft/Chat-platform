const { Message, User } = require('../../models');
const {
    UserInputError,
    AuthenticationError,
    ForbiddenError,
    withFilter
} = require('apollo-server');
const { Op } = require('sequelize');

module.exports = {
    Query: {
        getMessages: async (parent, { from }, { user }) => {
            try {
                if (!user) throw new AuthenticationError('Unauthenticated')

                const otherUser = await User.findOne({
                    where: { username: from }
                })
                if (!otherUser) throw new UserInputError('User not found')

                const usernames = [user.username, otherUser.username];

                const messages = await Message.findAll({
                    where: {
                        from: { [Op.in]: usernames },
                        to: { [Op.in]: usernames },
                    },
                    order: [['createdAt', 'DESC']],
                })

                return messages;
            } catch (error) {
                console.log(error);
                throw error
            }
        }
    },
    Mutation: {
        sendMessage: async (parent, { to, content }, { user, pubsub }) => {
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

                pubsub.publish('NEW_MESSAGE', { newMessage: message })

                return message;
            } catch (error) {
                console.log(error);
                throw error
            }
        },
    },
    reactToMessag: async (_, { uuid, content }, { user, pubsub }) => {
        const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎'];
        try {
            // Validate reaction content
            if (!reactions.includes(content)) {
                throw new UserInputError('Invalid reaction!')
            }

            const username = user ? user.username : '';
            user = await User.findOne({ where: { username } })
            if (!user) throw new AuthenticationError('Unauthenticated')

            const message = await Message.findOne({ where: { uuid } })
            if (!message) throw new UserInputError('Message not found!')

            if (message.from !== user.username && message.to !== user.username) {
                throw new ForbiddenError('Unauthorized')
            }

            let reaction = await Reaction.findOne({
                where: { messageId: message.id, userId: user.id }
            })

            if (reaction) {
                reaction.content = content
                await reaction.save()
            } else {
                reaction = await Reaction.create({
                    messageId: message.id,
                    userId: user.id,
                    content
                })
            }

            pubsub.publish('NEW_REACTION', { newReaction: reaction })

            return reaction
        } catch (error) {
            throw error
        }
    },
    Subscription: {
        newMessage: {
            subscribe: withFilter(
                (_, __, { pubsub, user }) => {
                    if (!user) throw new AuthenticationError('Unauthenticated')
                    return pubsub.asyncIterator(['NEW_MESSAGE'])
                }, ({ newMessage }, _, { user }) => {
                    if (newMessage.from === user.username ||
                        newMessage.to === user.username
                    ) {
                        return true
                    }

                    return false
                }
            ),
        },
        newReaction: {
            subscribe: withFilter(
                (_, __, { pubsub, user }) => {
                    if (!user) throw new AuthenticationError('Unauthenticated')
                    return pubsub.asyncIterator(['NEW_REACTION'])
                }, async ({ newReaction }, _, { user }) => {

                    const message = await newReaction.getMessage()

                    if (message.from === user.username ||
                        message.to === user.username
                    ) {
                        return true
                    }

                    return false
                }
            ),
        },
    }
};
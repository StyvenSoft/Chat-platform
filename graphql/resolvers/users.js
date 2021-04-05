const { Message, User } = require('../../models');
const bcrypt = require('bcryptjs');
const { UserInputError, AuthenticationError } = require('apollo-server');
const { JWT_SECRET } = require('../../config/env.json');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

module.exports = {
    Query: {
        getUsers: async (_, __, { user }) => {
            try {
                if (!user) {
                    throw new AuthenticationError('Unauthenticatedd')
                }

                let users = await User.findAll({
                    attributes: ['username', 'imageUrl', 'createdAt'],
                    where: { username: { [Op.ne]: user.username } },
                })
                const allUserMessages = await Message.findAll({
                    where: {
                        [Op.or]: [{ from: user.username }, { to: user.username }]
                    },
                    order: [['createdAt', 'DESC']]
                })

                users = users.map(otherUser => {
                    const latestMessage = allUserMessages.find(
                        m => m.from === otherUser.username || m.to === otherUser.username
                    )
                    otherUser.latestMessage = latestMessage
                    return otherUser
                })

                return users
            } catch (err) {
                console.log(err);
                throw err
            }
        },
        login: async (_, args) => {
            const { username, password } = args
            let errors = {}
            try {
                if (username.trim() === '') errors.username = 'Username must not be empty'
                if (password === '') errors.password = 'Password must not be empty'

                if (Object.keys(errors).length > 0) {
                    //  throw new UserInputError('Bad input', { errors })
                    throw new UserInputError('User not found')
                }

                const user = await User.findOne({
                    where: { username }
                })
                if (!user) {
                    errors.name = 'User not found'
                    throw new UserInputError('User not found', { errors })
                }
                const correctPassword = await bcrypt.compare(password, user.password);

                if (!correctPassword) {
                    errors.password = 'Password is incorrect'
                    throw new UserInputError('Password is incorrect', { errors })
                }

                const token = jwt.sign({ username }, JWT_SECRET, {
                    expiresIn: 60 * 60,
                })

                return {
                    ...user.toJSON(),
                    token,
                };
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    },
    Mutation: {
        register: async (_, args) => {
            let { username, email, password, confirmPassword } = args
            let errors = {};
            try {
                if (email.trim() === '') errors.email = 'Email must not be empty'
                if (username.trim() === '') errors.username = 'Username must not be empty'
                if (password.trim() === '') errors.password = 'Password must not be empty'
                if (confirmPassword.trim() === '') errors.confirmPassword = 'Repeat password must not be empty'

                if (password !== confirmPassword) errors.confirmPassword = 'Password must match'

                if (Object.keys(errors).length > 0) { throw errors }

                password = await bcrypt.hash(password, 6);
                // Create user
                const user = await User.create({
                    username,
                    email,
                    password
                })

                return user;
            } catch (error) {
                console.log(error);
                if (error.name === 'SequelizeUniqueConstraintError') {
                    error.errors.forEach(
                        (e) => (errors[e.path] = `${e.path} is already taken`)
                    )
                } else if (error.name === 'SequelizeValidationError') {
                    error.errors.forEach(
                        (e) => (errors[e.path] = e.message))
                }
                throw new UserInputError('Bad input', { errors: error });
            }
        }
    }
};
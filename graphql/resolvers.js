const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server');

module.exports = {
    Query: {
        getUsers: async () => {
            try {
                const users = await User.findAll()

                return users
            } catch (err) {
                console.log(err);
            }
        }
    },
    Mutation: {
        register: async (_, args) => {
            let { username, email, password, confirmPassword } = args
            let errors = {};
            try {
                if(email.trim() === '') errors.email = 'Email must not be empty'
                if(username.trim() === '') errors.username = 'Username must not be empty'
                if(password.trim() === '') errors.password = 'Password must not be empty'
                if(confirmPassword.trim() === '') errors.confirmPassword = 'Repeat password must not be empty'

                if(password !== confirmPassword) errors.confirmPassword = 'Password must match'

                if(Object.keys(errors).length > 0){ throw errors }

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
                if(error.name === 'SequelizeUniqueConstraintError') {
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
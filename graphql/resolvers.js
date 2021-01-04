module.exports = {
    Query: {
        getUsers: () => {
            const users = [
                {
                    username: "User1",
                    email: "user1@gmail.com"
                },
                {
                    username: "User2",
                    email: "user2@gmail.com"
                },
                {
                    username: "User3",
                    email: "user3@gmail.com"
                }
            ]
            return users;
        }
    },
};
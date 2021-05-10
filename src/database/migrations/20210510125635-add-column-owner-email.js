module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            "chats",
            "owner_email",
            Sequelize.STRING
        );
    },

    down: async (queryInterface, _) => {
        await queryInterface.removeColumn("chats", "owner_email");
    },
};

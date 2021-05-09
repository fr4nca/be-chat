module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("messages", {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            author_uuid: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            chat_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "chats",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            author_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            author_email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            text: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            file: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("messages");
    },
};

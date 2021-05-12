module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("chats", {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            owner_uuid: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            company_uuid: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            responsible_uuid: {
                type: Sequelize.UUID,
                allowNull: true,
            },
            summary: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            resource_type: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            resource_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            team: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            open: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
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
        return queryInterface.dropTable("chats");
    },
};

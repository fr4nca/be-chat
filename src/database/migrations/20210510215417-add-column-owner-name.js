module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("chats", "owner_name", Sequelize.STRING);
  },

  down: async (queryInterface, _) => {
    await queryInterface.removeColumn("chats", "owner_name");
  },
};

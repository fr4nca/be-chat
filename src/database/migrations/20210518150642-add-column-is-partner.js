module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("chats", "is_partner", Sequelize.BOOLEAN);
  },

  down: async (queryInterface, _) => {
    await queryInterface.removeColumn("chats", "is_partner");
  },
};

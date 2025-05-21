export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductTags', {
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      tagId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tags',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Caso queira garantir que cada (productId, tagId) seja único:
    await queryInterface.addConstraint('ProductTags', {
      fields: ['productId', 'tagId'],
      type: 'unique',
      name: 'unique_product_tag'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProductTags');
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('Appointments', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        idate: {
          
          allowNull: false,
          type: Sequelize.DATE,
        },

        userId: {
          type: Sequelize.INTEGER,
          references: { model: 'Users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true
        },
        canceledAt: {
          type: Sequelize.DATE,
        },
        
        providerId: {
          type: Sequelize.INTEGER,
          references: { model: 'Users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true
        },
      
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      
      });

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('users');

  }
};


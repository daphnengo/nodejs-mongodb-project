const Sequelize = require('sequelize');
const sequelizeDb = require('../util/database');

const OrderItem = sequelizeDb.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = OrderItem;

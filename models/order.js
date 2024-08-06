const Sequelize = require('sequelize');
const sequelizeDb = require('../util/database');

const Order = sequelizeDb.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Order;
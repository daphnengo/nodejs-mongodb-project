const Sequelize = require('sequelize');
const sequelizeDb = require('../util/database');

const CartItem = sequelizeDb.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = CartItem;

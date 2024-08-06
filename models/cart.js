const Sequelize = require('sequelize');
const sequelizeDb = require('../util/database');

const Cart = sequelizeDb.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;

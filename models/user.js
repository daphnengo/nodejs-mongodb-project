const Sequelize = require('sequelize');
const sequelizeDb = require('../util/database');

const User = sequelizeDb.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
},
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = User;

'use strict';
const {
  Model, TINYINT
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  accounts.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    phone: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'accounts',
  });
  return accounts;
};
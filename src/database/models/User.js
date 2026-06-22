'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {

      User.belongsTo(models.Rol, {
        as: 'rol',
        foreignKey: 'rolId'
      });
      
      User.belongsTo(models.Address, {
        as: 'address',
        foreignKey: 'addressId'
      });
      
      User.belongsTo(models.Range, {
        as: 'range',
        foreignKey: 'rangeId'
      });
      
      User.belongsTo(models.Identificator, {
        as: 'identificator',
        foreignKey: 'identificatorId'
      });
    }
  }

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    years: DataTypes.INTEGER.UNSIGNED,
    avatar: DataTypes.STRING,
    nick_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    about: DataTypes.TEXT,
    state: DataTypes.STRING,
    addressId: DataTypes.INTEGER.UNSIGNED,
    rolId: DataTypes.INTEGER.UNSIGNED,
    rangeId: DataTypes.INTEGER.UNSIGNED,
    identificatorId: DataTypes.INTEGER.UNSIGNED,
    headId: DataTypes.INTEGER.UNSIGNED,
    faceId: DataTypes.INTEGER.UNSIGNED,
    bustId: DataTypes.INTEGER.UNSIGNED,
    hatId: DataTypes.INTEGER.UNSIGNED,
    socialId: DataTypes.STRING,
    socialProvider: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};

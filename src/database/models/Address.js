'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
 
    static associate(models) {
     
      Address.hasMany(models.User, {
        as: 'users',
        foreignKey: 'addressId' 
      });
    }
  }

  Address.init({
    address: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    zipcode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Address',
    tableName: 'addresses',
  });

  return Address;
};
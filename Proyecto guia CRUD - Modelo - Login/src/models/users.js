'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
   
    email:{
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    }, 
    name:{
      type: DataTypes.STRING,
      allowNull: false
    }, 
    password:{
      type: DataTypes.STRING,
      allowNull: false
    }, 
    isAdmin:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    }, 
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
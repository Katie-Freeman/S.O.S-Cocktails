'use strict';
// const models = require('../models'); 
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Drink, { through: 'drink_ingredient' })
      this.belongsToMany(models.User, { through: 'user_ingredient'})
    }
  }
  Ingredient.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ingredient',
  });

  
  return Ingredient;
};
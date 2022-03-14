'use strict';
//const models = require('../models'); 
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Drink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Ingredient, { through: 'drink_ingredient' })
    }
  }
  Drink.init({
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    recipe: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Drink',
  });



  return Drink;
};
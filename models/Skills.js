const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Skills extends Model {}

Skills.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      skillName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'skills',
    }
  );
  
  module.exports = Skills;
  
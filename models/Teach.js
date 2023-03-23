const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Teach extends Model {}

Teach.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      skill_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'skills',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'teach',
    }
  );
  
  module.exports = Teach;
  
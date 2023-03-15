const { Model, DataTypes } = require('sequelize')

class Controls extends Model {
  static init(sequelize) {
    super.init(
      {
        dates: DataTypes.STRING,
        lat:DataTypes.STRING,
        long: DataTypes.STRING,
      },
      { sequelize }
    )
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    this.belongsTo(models.Property, { foreignKey: 'property_id', as: 'property' })
  }
}

module.exports = Controls

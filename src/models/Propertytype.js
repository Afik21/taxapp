const { Model, DataTypes } = require('sequelize')

class Propertytype extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        update_at: DataTypes.DATE,
      },
      { sequelize }
    )
  }

  static associate(models) {
    this.hasMany(models.Property, { foreignKey: 'property_type_id', as: 'property_propertytype', allowNull: true})
  }
}

module.exports = Propertytype

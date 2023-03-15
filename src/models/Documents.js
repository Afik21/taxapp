const { Model, DataTypes } = require('sequelize')

class Documents extends Model {
  static init(sequelize) {
    super.init(
      {
        label: DataTypes.STRING,
        code: DataTypes.STRING,
        description: DataTypes.TEXT,
      },
      { sequelize }
    )
  }

  static associate(models) {
    this.belongsTo(models.Property, { foreignKey: 'property_id', as: 'property_doc', allowNull: false})
  }
}

module.exports = Documents

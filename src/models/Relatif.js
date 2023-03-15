const { Model, DataTypes } = require('sequelize')

class Relatif extends Model {
  static init(sequelize) {
    super.init(
      {
        code: DataTypes.STRING,
        description: DataTypes.TEXT,
        update_at: DataTypes.DATE,
      },
      { sequelize }
    )
  }

  static associate(models) {
    this.belongsTo(models.Taxe, { foreignKey: 'taxe_id', as: 'taxe_relatif', allowNull: false})
    this.belongsTo(models.Property, { foreignKey: 'property_id', as: 'property_relatif', allowNull: false})
    this.hasMany(models.Payment, { foreignKey: 'taxe_rel_id', as: 'payment_relatif', allowNull: false })

  }
}

module.exports = Relatif

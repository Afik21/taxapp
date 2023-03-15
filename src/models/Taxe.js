const { Model, DataTypes } = require('sequelize')

class Taxe extends Model {
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
    this.hasMany(models.Relatif, { foreignKey: 'taxe_id', as: 'relatif_taxe', allowNull: true })
  }
}

module.exports = Taxe

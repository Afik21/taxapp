const { Model, DataTypes } = require('sequelize')

class Payment extends Model {
  static init(sequelize) {
    super.init(
      {
        dates: DataTypes.STRING,
        amount: DataTypes.DOUBLE,
        currency:DataTypes.CHAR,
        type:DataTypes.STRING,
        term: DataTypes.STRING,
        status:DataTypes.STRING,
        description: DataTypes.TEXT,
      },
      { sequelize }
    )
  }

  static associate(models) {
    this.belongsTo(models.Relatif, { foreignKey: 'taxe_rel_id', as: 'payment_relatif', allowNull: false })
  }
}

module.exports = Payment

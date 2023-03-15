const { Model, DataTypes } = require('sequelize')

class Login extends Model {
  static init(sequelize) {
    super.init(
      {
        latitude: DataTypes.STRING,
        longitude: DataTypes.STRING,
        connection_status: DataTypes.INTEGER,
        refresh_token: DataTypes.TEXT,
        update_at: DataTypes.DATE
      },
      { sequelize }
    )
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user', allowNull: false })
  }
}

module.exports = Login

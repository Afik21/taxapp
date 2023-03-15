const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        names: DataTypes.STRING,
        sexe: DataTypes.STRING,
        telephone: DataTypes.STRING,
        birth: DataTypes.DATE,
        role: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        status: DataTypes.INTEGER,
        photo: DataTypes.STRING,
      },
      {
        sequelize,
        hooks: {
          beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync()
            user.password = bcrypt.hashSync(user.password, salt)
          },
        },
      }
    )
  }

  static associate(models) {
    this.hasMany(models.Login, { foreignKey: 'user_id', as: 'login-user', allowNull: true })
    this.hasMany(models.Property, { foreignKey: 'user_id', as: 'property-user', allowNull: true })
    this.hasMany(models.Controls, { foreignKey: 'user_id', as: 'controls-user', allowNull: true })
  }
}

module.exports = User

const { Model, DataTypes } = require("sequelize");

class Qrcode extends Model {
  static init(sequelize) {
    super.init(
      {
        code: DataTypes.STRING,
        statut: DataTypes.INTEGER,
        update_at: DataTypes.DATE,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.hasMany(models.Property, {
      foreignKey: "qrcode_id",
      as: "property_qrcode",
      allowNull: true,
    });
  }
}

module.exports = Qrcode;

const { Model, DataTypes } = require("sequelize");

class Property extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        immatriculation: DataTypes.STRING,
        address: DataTypes.STRING,
        denomination: DataTypes.STRING,
        status: DataTypes.INTEGER,
        rccm: DataTypes.STRING,
        description: DataTypes.TEXT,
        thumbnails: DataTypes.STRING,
        register_date: DataTypes.DATE,
        update_at: DataTypes.DATE,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Qrcode, {
      foreignKey: "qrcode_id",
      as: "property_qrcode",
      allowNull: false,
    });
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      allowNull: false,
    });
    this.belongsTo(models.Propertytype, {
      foreignKey: "property_type_id",
      as: "propertytype_property",
      allowNull: true,
    });
    this.hasMany(models.Relatif, {
      foreignKey: "property_id",
      as: "relatif_pro",
      allowNull: true,
    });
    this.hasMany(models.Controls, {
      foreignKey: "property_id",
      as: "controls_pro",
      allowNull: true,
    });
    this.hasMany(models.Documents, {
      foreignKey: "property_id",
      as: "documents_pro",
      allowNull: true,
    });
  }
}

module.exports = Property;

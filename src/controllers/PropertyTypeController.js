const Propertytype = require("../models/Propertytype");
const { Op } = require("sequelize");

module.exports = {
  async get(req, res) {
    try {
      const typePropertys = await Propertytype.findAll();

      if (typePropertys == "" || typePropertys == null) {
        return res.status(200).json({
          message: "Aucune information disponible sur les types de propriétes.",
        });
      }
      return res.status(200).json({ typePropertys });
    } catch (error) {
      console.log({ "Error of get property type : ": error });
    }
  },
  async create(req, res) {
    try {
      const { title, description } = req.body;

      const check_title = await Propertytype.findOne({
        where: { title: title.toLowerCase() },
      });

      if (check_title != null) {
        return res.status(400).json({
          message: "Le type de propriété renseigné est déjà enregistrée.",
        });
      }

      const typeProperty = await Propertytype.create({
        title: title.toLowerCase(),
        description: description.toLowerCase(),
      });

      return res.status(200).json({
        status: 1,
        message: "Property Type saved succefully",
        typeProperty,
      });
    } catch (error) {
      console.log({ "Error of saving Property Type : ": error });
    }
  },
  async update(req, res) {
    try {
      const { title, description } = req.body;
      const { property_type_id } = req.params;

      const check_title = await Propertytype.findOne({
        where: { title: title },
      });

      if (check_title != null) {
        return res.status(400).json({
          message: "La type de proprété renseigné est déjà enregistrée.",
        });
      }

      const typeProperty = await Propertytype.update(
        { title, description },
        { where: { id: property_type_id } }
      );
      return res.status(200).json({
        status: 1,
        message: "property type updated succefully",
        typeProperty,
      });
    } catch (error) {
      console.log({ "Error of tax updating : ": error });
    }
  },
  async delete(req, res) {
    try {
      const { property_type_id } = req.params;
      const result = await Propertytype.destroy({
        where: { id: property_type_id },
      });

      return res.status(200).json({
        status: 1,
        message: "property type deleted successfully",
        result,
      });
    } catch (error) {
      console.log({ "Error of property type deleting : ": error });
    }
  },
};

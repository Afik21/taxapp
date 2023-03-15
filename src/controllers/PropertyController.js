const Property = require("../models/Property");
const Qrcode = require("../models/Qrcode");

const { Op } = require("sequelize");
var dateTime = require("node-datetime");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);

module.exports = {
  async get(req, res) {
    try {
      const propertys = await Property.findAll();

      if (propertys == "" || propertys == null) {
        return res.status(200).json({
          message: "Aucune information disponible sur les propriétes.",
        });
      }
      return res.status(200).json({ propertys });
    } catch (error) {
      console.log({ "Error of get property : ": error });
    }
  },
  async getByKey(req, res) {
    try {
      const { key } = req.params;
      const propertys = await Property.findAll({
        where: {
          [Op.or]: [{ user_id: key }],
        },
      });

      if (propertys == "" || propertys == null) {
        return res.status(200).json({
          message: "Aucune information disponible sur les propriétes.",
        });
      }
      return res.status(200).json({ propertys });
    } catch (error) {
      console.log({ "Error of get property : ": error });
    }
  },
  async create(req, res) {
    try {
      const {
        property_type_id,
        qrcode_id,
        user_id,
        title,
        immatriculation,
        address,
        denomination,
        rccm,
        description,
      } = req.body;

      const check_immatriculation = await Property.findOne({
        where: { immatriculation: immatriculation },
      });

      if (check_immatriculation != null) {
        return res.status(400).json({
          status: 0,
          message: "Cette propriétée renseignée est déjà enregistrée.",
        });
      }
      const status = 0;

      var dt = dateTime.create();
      var formatted = dt.format("Y-m-d H:M:S");
      const register_date = formatted;

      const property = await Property.create({
        property_type_id,
        qrcode_id,
        user_id,
        title,
        immatriculation,
        address,
        denomination,
        status,
        rccm,
        description,
        register_date,
      });

      // if (property != null) {
      //   const qrcode_update = await Qrcode.update(
      //     {
      //       statut: 1,
      //       update_at: formatted,
      //     },
      //     { where: { id: qrcode_id } }
      //   );

      //   if (qrcode_update != null) {
      //     // client.messages
      //     //   .create({
      //     //     to: process.env.PHONE_NUMBER,
      //     //     from: "",
      //     //     body: "This is the ship that",
      //     //   })
      //     //   .then((message) => console.log(message.sid));
      //     return res.status(200).json({
      //       status: 1,
      //       message: `Propriété ${title} enregistrée avec succès.`,
      //       property,
      //     });
      //   }
      // }

      return res.status(206).json({
        status: 1,
        message: `Propriété ${title.toUpperCase()} enregistrée avec succès. Mais le QrCode n'a pas été définitivement activé.`,
        property,
      });
    } catch (error) {
      console.log({ "Erreur de l'enregistrement de la propriété : ": error });
    }
  },
  async update(req, res) {
    try {
      const {
        user_id,
        property_type_id,
        title,
        immatriculation,
        address,
        status,
        rccm,
        description,
        thumbnails,
      } = req.body;
      const { property_id } = req.params;

      const check_immatriculation = await Property.findOne({
        where: { immatriculation: immatriculation },
      });

      if (check_immatriculation != null) {
        return res
          .status(400)
          .json({ message: "La propriétée renseignée est déjà enregistrée." });
      }

      const property = await Property.update(
        {
          user_id,
          property_type_id,
          title,
          immatriculation,
          address,
          status,
          rccm,
          description,
          thumbnails,
        },
        { where: { id: property_id } }
      );
      return res
        .status(200)
        .json({ status: 1, message: "property updated succefully", property });
    } catch (error) {
      console.log({ "Error of property updating : ": error });
    }
  },
  async delete(req, res) {
    try {
      const { property_id } = req.params;
      await Property.destroy({ where: { id: property_id } });

      return res.status(200).json({
        status: 1,
        message: "property deleted successfully",
      });
    } catch (error) {
      console.log({ "Error of property deleting : ": error });
    }
  },
};

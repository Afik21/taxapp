const Payment = require("../models/Payment");
const { Op } = require("sequelize");

module.exports = {
  async get(req, res) {
    try {
      const payment = await Payment.findAll();

      if (payment == "" || payment == null) {
        return res
          .status(200)
          .json({
            message: "Aucune information disponible sur les paiements.",
          });
      }
      return res.status(200).json({ propertys });
    } catch (error) {
      console.log({ "Error of get paiements : ": error });
    }
  },
  async create(req, res) {
    try {
      const {
        taxe_rel_id,
        dates,
        amount,
        currency,
        type,
        term,
        status,
        description,
        card_name,
        card_expiration,
        card_security,
      } = req.body;

      const payment = await Payment.create({
        taxe_rel_id,
        dates,
        amount,
        currency,
        type,
        term,
        status,
        description,
      });

      return res
        .status(200)
        .json({ status: 1, message: "payment saved succefully", payment });
    } catch (error) {
      console.log({ "Error of saving payment : ": error });
    }
  },
  async delete(req, res) {
    try {
      const { payment_id } = req.params;
      await Payment.destroy({ where: { id: payment_id } });

      return res.status(200).json({
        status: 1,
        message: "payment deleted successfully",
      });
    } catch (error) {
      console.log({ "Error of payment deleting : ": error });
    }
  },
};

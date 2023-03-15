const Qrcode = require("../models/Qrcode");
const { Op } = require("sequelize");
var dateTime = require("node-datetime");

module.exports = {
  async get(req, res) {
    try {
      const { count_start, count_limit } = req.query;
      // {
      //   order: [["id", "ASC"]],
      // }
      const get_qrcodes = await Qrcode.findAll();
      if (get_qrcodes == "" || get_qrcodes == null) {
        return res.status(200).json({ message: "Aucun QRCode généré." });
      }

      var qrcodes = [];

      for (let index = count_start; index < count_limit; index++) {
        qrcodes.push(get_qrcodes[index]);
      }

      return res.status(200).json({ qrcodes });
    } catch (error) {
      console.log({ "Error of get qrcode : ": error });
    }
  },
  async getByKey(req, res) {
    try {
      const { key } = req.params;
      const qrcodes = await Qrcode.findAll({
        where: {
          [Op.or]: [{ code: { [Op.like]: `%${key}%` } }],
        },
      });

      if (qrcodes == "" || qrcodes == null) {
        return res.status(200).json({
          message:
            "Aucune information disponible à propos de l'élément renseigné.",
        });
      }
      return res.status(200).json({ qrcodes });
    } catch (error) {
      console.log({ "Error of get qrcodes search by key : ": error });
    }
  },
  async getPrint(req, res) {
    try {
      const { start, end } = req.query;
      console.log({ "params : ": req.query });

      var _start = "";
      var _end = "";

      if (isNaN(start)) {
        _start = start;
      } else {
        if (start.toString().length < 6) {
          let sub = 6 - parseInt(start.toString().length);
          let tmp = [];
          for (let i = 0; i < sub; i++) {
            tmp.push("0");
          }
          _start = tmp.join("") + start;
        } else {
          _start = start;
        }
      }

      if (isNaN(end)) {
        _end = end;
      } else {
        if (end.toString().length < 6) {
          let sub = 6 - parseInt(end.toString().length);
          let tmp = [];
          for (let i = 0; i < sub; i++) {
            tmp.push("0");
          }
          _end = tmp.join("") + end;
        } else {
          _end = end;
        }
      }

      const qrcodes_start = await Qrcode.findOne({
        where: {
          code: { [Op.like]: `%${_start}%` },
        },
      });

      const qrcodes_end = await Qrcode.findOne({
        where: {
          code: { [Op.like]: `%${_end}%` },
        },
      });

      const code_start = qrcodes_start.code;
      const code_end = qrcodes_end.code;

      const qrcodes = await Qrcode.findAll({
        where: {
          [Op.or]: [
            { code: { [Op.between]: [code_start, code_end] } },
            { code: { [Op.between]: [code_end, code_start] } },
          ],
        },
      });

      if (qrcodes == "" || qrcodes == null) {
        return res.status(200).json({
          message:
            "Aucune information disponible sur l'interval renseigné pour l'impression.",
        });
      }
      return res.status(200).json({ qrcodes });
    } catch (error) {
      console.log({
        "Error of get qrcodes search by key for printing : ": error,
      });
    }
  },
  async create(req, res) {
    try {
      const { key } = req.body;
      const qrcodTab = [];

      for (let index = 0; index < key; index++) {
        var dt = dateTime.create();
        // var formatted = dt.format("m/d/Y H:M:S");
        var formattedDate = dt.format("Ymd");
        var formattedTime = dt.format("HMS");

        const count_qrcodes = await Qrcode.count();
        let count_len = "";
        let cq = 0;

        if (count_qrcodes.toString().length < 6) {
          cq = count_qrcodes + 1;
          let sub = 6 - parseInt(cq.toString().length);
          var tmp = [];
          for (let i = 0; i < sub; i++) {
            tmp.push("0");
          }
          count_len = tmp.join("") + cq;
        } else {
          count_len = cq;
        }

        const code =
          "HVK/" +
          formattedDate +
          "-" +
          count_len +
          "-" +
          formattedTime +
          "/TCI";

        const qrcod = await Qrcode.create({ code });
        qrcodTab.push(qrcod);
      }

      return res.status(200).json({
        status: 1,
        message: `${key} Tax Code Identifier for QrCode generated successfully.`,
        qrcodTab,
      });
    } catch (error) {
      console.log({ "Error of qrcodes generating : ": error });
    }
  },
  async delete(req, res) {
    try {
      const { qrcode_id } = req.params;
      await Qrcode.destroy({ where: { id: qrcode_id } });

      return res.status(200).json({
        status: 1,
        message: "qrcode deleted successfully",
      });
    } catch (error) {
      console.log({ "Error of qrcode deleting : ": error });
    }
  },
};

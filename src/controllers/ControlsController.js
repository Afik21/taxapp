const Controls = require('../models/Controls')
const { Op } = require("sequelize");

module.exports = {
  async get(req, res) {
    try {
      const controls = await Controls.findAll()

      if (controls == '' || controls == null) {
        return res
          .status(200)
          .json({ message: 'Aucune information disponible sur les controles de propriétes.' })
      }
      return res.status(200).json({ controls })
    } catch (error) {
      console.log({ 'Error of get controls : ': error })
    }
  },
  async create(req, res) {
    try {
      const { property_id, user_id, dates, lat, long } = req.body

      const control = await Controls.create({
        property_id, user_id, dates, lat, long
      })

      return res
        .status(200)
        .json({ status: 1, message: 'control saved succefully', control })
    } catch (error) {
      console.log({ 'Error of saving control : ': error })
    }
  },
  async delete(req, res) {
    try {
      const { controls_id } = req.params
      await Controls.destroy({ where: { id: controls_id } })

      return res.status(200).json({
        status: 1,
        message: 'controls deleted successfully',
      })
    } catch (error) {
      console.log({ 'Error of controls deleting : ': error })
    }
  },
}

const Taxe = require('../models/Taxe')
const { Op } = require("sequelize");

module.exports = {
  async get(req, res) {
    try {
      const taxes = await Taxe.findAll()

      if (taxes == '' || taxes == null) {
        return res
          .status(200)
          .json({ message: 'Aucune information disponible sur la taxe.' })
      }
      return res.status(200).json({ taxes })
    } catch (error) {
      console.log({ 'Error of get taxes : ': error })
    }
  },
  async create(req, res) {
    try {
      const { title, description } = req.body

      const check_title = await Taxe.findOne({ where: { title: title } })

      if (check_title != null) {
        return res
          .status(400)
          .json({ message: "La taxe renseigné est déjà enregistrée." })
      }

      const taxe = await Taxe.create({ title, description })

      return res
        .status(200)
        .json({ status: 1, message: 'tax saved succefully', taxe })
    } catch (error) {
      console.log({ 'Error of saving tax : ': error })
    }
  },
  async update(req, res) {
    
    try {
      const { name, description } = req.body
      const { taxe_id } = req.params

      const check_name = await Taxe.findOne({ where: { name: name } })

      if (check_name != null) {
        return res
          .status(400)
          .json({ message: "La taxe renseigné est déjà enregistrée." })
      }

      const tax = await Taxe.update(
        { name, description },
        { where: { id: taxe_id } }
      )
      return res
        .status(200)
        .json({ status: 1, message: 'tax updated succefully', tax })
    } catch (error) {
      console.log({ 'Error of tax updating : ': error })
    }
  },
  async delete(req, res) {
    try {
      const { taxe_id } = req.params
      await Taxe.destroy({ where: { id: taxe_id } })

      return res.status(200).json({
        status: 1,
        message: 'tax deleted successfully',
      })
    } catch (error) {
      console.log({ 'Error of tax deleting : ': error })
    }
  },
}

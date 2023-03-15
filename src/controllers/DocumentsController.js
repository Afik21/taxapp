const Documents = require('../models/Documents')
const { Op } = require("sequelize");

module.exports = {
  async get(req, res) {
    try {
      const documents = await Documents.findAll()

      if (documents == '' || documents == null) {
        return res
          .status(200)
          .json({ message: 'Aucune information disponible sur les documents.' })
      }
      return res.status(200).json({ propertys })
    } catch (error) {
      console.log({ 'Error of get documents : ': error })
    }
  },
  async create(req, res) {
    try {
      const { property_id, label, code, description } = req.body

      const check_label = await Documents.findOne({ where: { label: label } })

      if (check_label != null) {
        return res
          .status(400)
          .json({ message: "Ce document renseigné est déjà enregistrée." })
      }

      const document = await Documents.create({
        property_id, label, code, description
      })

      return res
        .status(200)
        .json({ status: 1, message: 'Document saved succefully', document })
    } catch (error) {
      console.log({ 'Error of saving document : ': error })
    }
  },
  async update(req, res) {
    try {
      const { property_id, label, code, description } = req.body
      const { document_id } = req.params

      const check_label = await Documents.findOne({ where: { label: label } })

      if (check_label != null) {
        return res
          .status(400)
          .json({ message: "La propriétée renseignée est déjà enregistrée." })
      }

      const document = await Documents.update(
        { property_id, label, code, description },
        { where: { id: document_id } }
      )
      return res
        .status(200)
        .json({ status: 1, message: 'document updated succefully', document })
    } catch (error) {
      console.log({ 'Error of document updating : ': error })
    }
  },
  async delete(req, res) {
    try {
      const { document_id } = req.params
      await Documents.destroy({ where: { id: property_id } })

      return res.status(200).json({
        status: 1,
        message: 'document deleted successfully',
      })
    } catch (error) {
      console.log({ 'Error of document deleting : ': error })
    }
  },
}

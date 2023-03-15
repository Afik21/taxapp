const Relatif = require('../models/Relatif')

module.exports = {
  async get(req, res) {
    try {
      const taxes_relatif = await Relatif.findAll()

      if (taxes_relatif == '' || taxes_relatif == null) {
        return res
          .status(200)
          .json({ message: 'Aucune information disponible sur les taxes relatifs.' })
      }
      return res.status(200).json({ taxes })
    } catch (error) {
      console.log({ 'Error of get taxes : ': error })
    }
  },
  async create(req, res) {
    try {
      const { property_id, taxe_id, code } = req.body

      const check_exist = await Relatif.findOne({ where: { property_id: property_id, taxe_id:taxe_id } })

      if (check_exist != null) {
        return res
          .status(400)
          .json({ message: "La taxe relative renseigné est déjà enregistrée." })
      }

      const taxe_relatif = await Relatif.create({
        property_id, taxe_id, code
      })

      return res
        .status(200)
        .json({ status: 1, message: 'taxe relatif saved succefully', taxe_relatif })
    } catch (error) {
      console.log({ 'Error of saving tax relatif : ': error })
    }
  },
  async delete(req, res) {
    try {
      const { taxe_relatif_id } = req.params
      await Relatif.destroy({ where: { id: taxe_relatif_id } })

      return res.status(200).json({
        status: 1,
        message: 'tax relatif deleted successfully',
      })
    } catch (error) {
      console.log({ 'Error of tax relatif deleting : ': error })
    }
  },
}

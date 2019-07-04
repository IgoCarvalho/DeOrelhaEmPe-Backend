const mongoose = require('mongoose');

require('../models/acao-model');
const AcaoModel = mongoose.model('Acao');


module.exports = {
  async create(req, res) {
    try {
      const { description } = req.body
      console.log(req.body)
      console.log(req.filesData[0])
      console.log(req.files[0])
      const newAcao = new AcaoModel({
        description,
        image: req.filesData[0],
      })

      const ac = await newAcao.save()

      //req.io.emit('newOccurrence', occ)
      
      return res.status(201).send({
        ac
      })
    } catch (error) {
      return res.status(500).send({ error })
    }
  },
  async findAll(req, res) {
    console.log(req.body)
    const ac = await AcaoModel.find({}).sort('-updatedAt')
    return res.send({ ac })
  },
  async findSmall(req, res) {
    console.log(req.body)
    const occ = await OccurrenceModel.find({}, "title description category status")
    return res.send({ occ })
  },
  async updateStatus(req, res) {
    console.log(req.body)
    const status = JSON.parse(req.body.status)
    const { id, description } = req.body
    const oc = await OccurrenceModel.findById(id)
    oc.timeLine.push({ status, description })
    oc.status = status
    // console.log(oc)
    const n = await oc.save()
    console.log(n)

    req.io.emit('updateStatus', n)

    return res.send({ occ: n })
  },
  async addComent(req, res) {
    console.log(req.body)
    const { id, coment: text } = req.body
    const user = req.userId || req.body.userId
    const oc = await OccurrenceModel.findById(id)
    oc.coments.push({ user, text })
    // console.log(oc);
    const n = await oc.save()
    console.log(n)

    req.io.emit('newComent', n)

    return res.send({ occ: n })
  }
};
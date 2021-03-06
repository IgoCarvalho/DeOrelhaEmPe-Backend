const mongoose = require('mongoose');

require('../models/occuurrence-model');
const OccurrenceModel = mongoose.model('Occurrence');

require('../models/complaint-model');
const ComplaintModel = mongoose.model('Complaint');

module.exports = {
  async create(req, res) {
    try {
      const { title, description, geoData, street, number, neighborhood } = req.body
      const category = JSON.parse(req.body.category)
      // console.log(req.body)
      console.log(req.filesData)
      const newOccurrence = new OccurrenceModel({
        user: req.userId,
        title,
        description,
        category,
        files: req.filesData,
        address: {
          street,
          number,
          neighborhood
        },
        geoData
      })

      const occ = await newOccurrence.save()
      const oc = await OccurrenceModel.findById(occ._id).populate("user", "name email")

      req.io.emit('newOccurrence', oc)
      //const occ = await OccurrenceModel.findById(oc.user)      
      return res.status(201).send({
        occ
      })
    } catch (error) {
      return res.status(500).send({ error })
    }
  },
  async find(req, res) {
    console.log(req.body)
    const occ = await OccurrenceModel.find({}).sort('-updatedAt').populate("user", "name email")
    return res.send({ occ })
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
    const oc = await OccurrenceModel.findById(id).populate("user", "name")
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
    console.log(req.io)

    req.io.emit('newComent', n)

    return res.send({ occ: n })
  }
};
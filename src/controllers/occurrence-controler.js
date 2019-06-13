const mongoose = require('mongoose');

require('../models/occuurrence-model');
const OccurrenceModel = mongoose.model('Occurrence');

require('../models/complaint-model');
const ComplaintModel = mongoose.model('Complaint');

module.exports = {
  async create(req, res){
    console.log(req.body)
    const newOccurrence = new OccurrenceModel({
      user: req.body.userId,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      geoData: req.body.geoData
    })

    const occ = await OccurrenceModel.create(newOccurrence)
    return res.send({occ})
  },
  async find(req, res){
    console.log(req.body)
    const oc = await OccurrenceModel.find({}).populate("user", "name email")
    return res.send({oc})
  }
};
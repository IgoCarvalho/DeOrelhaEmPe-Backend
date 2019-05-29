const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/properties');


require('../models/UserModel');
const UserModel = mongoose.model('User');

const generateToken = (id) => {
  const token = jwt.sign({
    id: id
  }, config.secretKey);

  return token;
}

module.exports = {
  async findAll(req, res) {
    // Busca todos
    const user = await UserModel.find();

    return res.json(user);
  },
  async findById(req, res) {
    // Busca unica
    const user = await UserModel.findById(req.params.id);

    return res.json(user);
  },
  async create(req, res) {
    // Criacao
    try {
      const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
      });
      const user = await UserModel.create(newUser);
      return res.json(user);
    } catch (err) {
      res.status(404).send(`erro: ${err}`);
    }

  },
  async update(req, res) {
    // Atualizacao
    const user = await UserModel.findOneAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(user);
  },
  
  async destroy(req, res) {
    // Remocao
    const r = await UserModel.findOneAndRemove(req.params.id);

    return res.json(r);
  },

  async signIn(req, res) {
    try {
      const {email, password} = req.body;

      const user = await UserModel.findOne({ email });

      if (!user)
        return res.status(400).send({
          'erro': 'usuaro invalido'
        });

      if (!await bcrypt.compare(password, user.password))
        res.status(400).send({
          'erro': 'senha invalida'
        });

      user.password = undefined;

      return res.send({
        user,
        token: await generateToken(user.id)
      })
    } catch (ex) {
      return res.status(500).send({
        'erro': ex
      });
    }
  },

  async signUp(req, res) {

    try {

      console.log(req.body);

      const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
      });

      const user = await UserModel.create(newUser);
      user.password = undefined;

      return res.status(201).json({
        user,
        token: await generateToken(user.id)
      });

    } catch (err) {
      res.status(500).send(`erro: ${err}`);
    }
  }
};
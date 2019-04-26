const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, hex, red, green, blue } = req.body;
    Color
      .create({ name, hex, red, green, blue })
      .then(color => res.send(color))
      .catch(next);
  })
  // eslint-disable-next-line no-unused-vars
  .get('/', (req, res, next) => {
    Color
      .find()
      .select({
        _id: true,
        name: true
      })
      .lean()
      .then(color => res.send(color))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Color
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(color => res.send(color))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const { name } = req.body;
    Color
      .findByIdAndUpdate(req.params.id, { name }, { new: true })
      .select({
        _id: true,
        name: true
      })
      .lean()
      .then(color => res.send(color))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Color
      .findByIdAndDelete(req.params.id)
      .select({
        _id: true
      })
      .lean()
      .then(deletedColor => res.send(deletedColor))
      .catch(next);
  });

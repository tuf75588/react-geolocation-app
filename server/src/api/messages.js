const express = require('express');
const Joi = require('joi');
const db = require('../db');

const entries = db.get('entries');
const router = express.Router();


const schema = Joi.object().keys({
  name: Joi.string().min(1).max(500).required(),
  message: Joi.string().min(1).max(500).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required()
});

router.get('/', (req, res) => {
  entries.find({}).then((results) => {
    res.json(results);
  });
});

router.post('/', (req, res, next) => {
  // begin joi validation.
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    // insert into db
    const {
      name, message, latitude, longitude
    } = req.body;
    const userMessage = {
      name,
      message,
      latitude,
      longitude,
      date: new Date()
    };
    entries.insert(userMessage).then(results => res.json(results));
  } else {
    next(result.error);
  }
});
module.exports = router;

'use strict';
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Farmer = mongoose.model('Farmer');
const Customer = mongoose.model('Customer');
require('dotenv').config({ path: '../variables.env' });

const schemaResolve = (schema) => {
  switch(schema){
    case 0: return Farmer; break;
    case 1: return Customer; break;
    default: return Customer;
  }
}

//Provides a jwt token if user is authorized.
exports.authenticate = async (req, res) => {
  const Schema = await schemaResolve(req.query.schema);
  Schema.findOne({ phoneNumber: req.body.phoneNumber }, (err, user) => {
    if (err) throw err;

    if (req.query.phoneNumber === user.phoneNumber) {
      const payload = {
        phone: user.phoneNumber
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 1440*60
      });
      res.json({
        success: true,
        message: 'Authentication succeeded.',
        token: token,
        user_id: 123
      });
    } else {
      res.json({
        success: false,
        message: 'Authentication failed.'
      });
    }
  })
}

//Validates the jwt token.
exports.validate = (req, res, next) => {
  const token = req.query.token || req.body.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token.toString(), process.env.JWT_SECRET, (err,decoded) => {
      if (err) return res.json({
        success: false,
        message: 'Failed to authenticate token.'
      });
      else {
        req.decoded = decoded;
        next();
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'You are not authorized to access this resource. Please login again.'
    })
  }
}

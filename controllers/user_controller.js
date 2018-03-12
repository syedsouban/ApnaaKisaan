"use strict";
const mongoose = require('mongoose');
const Farmer = mongoose.model('Farmer');
const Customer = mongoose.model('Customer');

const schemaResolve = (schema) => {
  switch(schema){
    case 0: return Farmer; break;
    case 1: return Customer; break;
    default: return Customer;
  }
}

exports.addUser = async (req, res) => {
  const Schema = await schemaResolve(req.query.schema);
  let newUser = Schema({
    firstName: `${req.query.firstName}`,
    lastName: `${req.query.lastName}`,
    gender: `${req.query.gender}`,
    phoneNumber: `${req.query.phoneNumber}`
  });

  //Save the product.
  newUser.save((err) => {
    if (err) {
        console.log(err);
        res.json({
          success: false,
          message: 'Something went wrong.'
        })
    }
    res.json({
      success: true,
      message: 'Product was added succesfully.'
    });
  })
}

//Updates a product
exports.updateAUser = async (req,res) => {
  const Schema = await schemaResolve(req.query.schema);
  let product;

  Schema.findById(req.query.id, function(err, product) {
    if (err) throw err;

    product.firstName = req.query.firstName || product.firstName;
    product.lastName = req.query.lastName || product.lastName;
    product.gender = req.query.gender || product.gender;
    product.phoneNumber = req.query.phoneNumber || product.phoneNumber;

    product.save(function(err) {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          message: 'Something went wrong.'
        })
      };
      res.json({
        success: true,
        message: 'User was updated succesfully.'
      });
    });
  });
}

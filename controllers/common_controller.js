"use strict";
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Farmer = mongoose.model('Farmer');
const Customer = mongoose.model('Customer');
const PersonalProduct = mongoose.model('PersonalProduct');

//local functions
const schemaResolve = (schema) => {
  switch(schema){
    case 0: return Farmers; break;
    case 1: return Product; break;
    case 2: return Customer; break;
    case 3: return PersonalProduct; break;
    default: return Farmers;
  }
}

//exported functions
//**-----READ-----**  Read documents from a schema
exports.readData = async (req, res) => {
  const Schema = await schemaResolve(req.query.schema);
  Schema.find({}, (err,data) => {
    res.json({
      success: true,
      message: 'API call was successfull.',
      data
    });
  }).catch((error) => {
    console.log(err);
    res.json({
      success: false,
      message: 'Something went wrong.',
      data: 'none'
    })
  });
}

//**-----READ-----**  Read documents from a schema for a graph
exports.OverviewData = async (req, res) => {
  let total_users = 0
  let products = 0
  let total_leads = 0
  const dates = []
  Users.find({}, (err, found) => {
    total_users = found.length
    for (let i = 0; i < found.length; i++) {
      dates.push({
        date: ('' + found[i].created_at)
      })
    }
  }).then(()=>{
    Software.find({}, (err, found) => {
      products = found.length
    }).catch((error) => {
      console.log(err);
      res.json({
        success: false,
        message: 'Something went wrong.',
        data: 'none'
      })
    });
  }).then(()=>{
    Leads.find({}, (err, found) => {
      total_leads = found.length
      res.json({
        success: true,
        message: 'API call was successfull.',
        data: {
          total_users,
          products,
          total_leads,
          dates
        }
      })
    }).catch((error) => {
      console.log(err);
      res.json({
        success: false,
        message: 'Something went wrong.',
        data: 'none'
      })
    });
  }).catch((error) => {
  console.log(err);
    res.json({
      success: false,
      message: 'Something went wrong.',
      data: 'none'
    })
  });
}

//**-----DELETE-----**   Delete a single document from the Schema
exports.deleteSingularData = async (req, res) => {
  const Schema = await schemaResolve(req.query.schema);
    Schema.findByIdAndRemove(req.query.id, () => {
    res.json({
      success: true,
      message: `The "${req.query.schema.toUpperCase()}" document was removed.`,
      data: 'none'
    });
  }).catch((error) => {
    console.log(err);
    res.json({
      success: false,
      message: 'Something went wrong.',
      data: 'none'
    })
  });
}

//**-----DELETE-----**  Delete all documents from the Schema
exports.deleteAllData = async (req, res) => {
  const Schema = await schemaResolve(req.query.schema);
    Schema.remove({}, () => {
    res.json({
      success: true,
      message: `All of "${req.query.schema.toUpperCase()}" documents were removed.`,
      data: 'none'
    });
  }).catch((error) => {
    console.log(err);
    res.json({
      success: false,
      message: 'Something went wrong.',
      data: 'none'
    })
  });
}

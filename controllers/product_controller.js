'use strict';
const mongoose = require('mongoose');
const ProductCategory = mongoose.model('Product');
const Product = mongoose.model('PersonalProduct');

//Adds a new product.
exports.addProduct = (req,res,next) => {
  let newProduct = Product({
    category: `${req.query.category || 'None Provided'}`,
    title: `${req.query.title || 'None Provided'}`,
    seller_id: `${req.query.seller_id || 'None Provided'}`,
    urgency: `${req.query.urgency || 'None Provided'}`,
    amount: `${req.query.amount || 'None Provided'}`,
    image: `${req.query.image || 'None Provided'}`,
    duration: `${req.query.duration || 'None Provided'}`,
  });

  //Save the product.
  newProduct.save((err) => {
    if (err) {
        console.log(err);
        res.json({
          success: false,
          message: 'Something went wrong.'
        })
    } else {
        next();
    };
  })
}

//Updates a product
exports.updateAProduct = (req,res) => {
  let product;
  Product.findById(req.query.id, function(err, product) {
    if (err) throw err;

    product.category = req.query.category || product.category;
    product.title = req.query.title || product.title;
    product.seller_id = req.query.title || product.seller_id;
    product.urgency = req.query.urgency || product.urgency;
    product.amount = req.query.amount || product.amount;
    product.image = req.query.image || product.image;
    product.duration = req.query.duration || product.duration;

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
        message: 'Product was updated successfully.'
      })

    });
  });
}

exports.addCategory = (req,res) => {
  let newProduct = ProductCategory({
    category: req.query.category,
    title:  req.query.title,
    market_price: req.query.market_price,
    description: req.query.description
  });

  //Save the product.
  newProduct.save((err) => {
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
exports.updateAProductCategory = (req,res) => {
  if (req.query.seller_id) {
    let array = new Array();
    array.push(req.query.seller_id);
    let data = JSON.stringify(array)
    ProductCategory.findOneAndUpdate({title: req.query.title}, { sellers: data }, (err, user) => {
    if (err) {
      console.log(err);
      res.json({
        success: false,
        message: 'Something went wrong.'
      })
    };
      res.json({
        success: true,
        message: 'Product was updated succesfully.'
      });
    });
  }
}

'use strict';
const express = require('express');
const router = express.Router();
const common = require('../controllers/common_controller');
const product = require('../controllers/product_controller')
const auth = require('../controllers/auth_controller');
const user = require('../controllers/user_controller');

//All routes.
router.get('/', (req, res) => { res.send('Welcome to Uzair\'s Farm and Mercantile') });
router.post('/login', auth.authenticate);
router.post('/add_product', product.addProduct, product.updateAProductCategory);
router.post('/add_category', product.addCategory);
router.post('/add_user', user.addUser);
router.post('/update_user', user.updateAUser);
router.post('/update_product', auth.validate, product.updateAProduct);

//Export the Router.
module.exports = router;

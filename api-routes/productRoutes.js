var express = require('express');
var router = express.Router();

var product = require('../services/product');
var helper = require('../config/helper');

router.post('/', helper.pAuthCheck, product.createNewProduct);

router.get('/:id', product.getProduct);

router.put('/:id', helper.pAuthCheck, product.putProduct);

router.patch('/:id', helper.pAuthCheck, product.patchProduct);

router.delete('/:id', helper.pAuthCheck, product.deleteProduct);

module.exports = router;
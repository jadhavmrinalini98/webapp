var express = require('express');
var router = express.Router();

var image = require('../services/image');
var product = require('../services/product');
var helper = require('../config/helper');

router.post('/', helper.pAuthCheck, product.createNewProduct);

router.get('/:id', product.getProduct);

router.put('/:id', helper.pAuthCheck, product.putProductInfo);

router.patch('/:id', helper.pAuthCheck, product.patchProductInfo);

router.delete('/:id', helper.pAuthCheck, product.deleteProduct);

// Image routes.

router.post('/:id/image', helper.pAuthCheck, image.upload);
router.get('/:id/image/:imageId', helper.pAuthCheck, helper.imAuth, image.getImageMeta);
router.get('/:id/image', helper.pAuthCheck, image.getAllImages);
router.delete('/:id/image/:imageId', helper.pAuthCheck, helper.imAuth, image.delImage);

module.exports = router;
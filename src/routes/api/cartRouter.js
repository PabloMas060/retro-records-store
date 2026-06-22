const router = require('express').Router();

// 1. Importaciones
const apiController = require('../../controllers/api/cartApiController');
const viewController = require('../../controllers/users/cart');

router
    .get('/', viewController.cartView)
    .get('/getOrderPending', apiController.getOrderPending)
    .post('/addProduct', apiController.addProduct)
    .post('/removeProduct', apiController.removeProduct) 
    .post('/clearCart', apiController.clearCart)
    .post('/statusOrder', apiController.statusOrder); 

module.exports = router;
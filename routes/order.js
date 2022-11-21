const express = require('express');
const orderRoutes = express.Router();
const orderController= require('../controllers/order');
orderRoutes.post('/orders', orderController.postOrder);
orderRoutes.get('/orders',orderController.getOrder);
module.exports=orderRoutes;
const express=require('express');
const cartRoutes=express.Router();
const cartController=require('../controllers/cart');
cartRoutes.post('/cart',cartController.postCart);
cartRoutes.get('/cart',cartController.getCart);
cartRoutes.post('/cart-delete/:productId',cartController.removeCart);

module.exports=cartRoutes;
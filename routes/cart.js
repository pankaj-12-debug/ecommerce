const express=require('express');
const cartRoutes=express.Router();
const cartController=require('../controllers/cart');
cartRoutes.post('/cart',cartController.postCart);


module.exports=cartRoutes;
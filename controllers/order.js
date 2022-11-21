exports.postOrder=async(req,res)=>{
    try {
        let fetchedCart;
        const cart=await req.user.getCart();
        fetchedCart=cart;
        const products=await cart.getProducts();
      //  const order=await req.user.createOrder();
     //   const orderDetails= await order.addProducts(products.map(product => { 
            // console.log(product.cartItem.quantity)
       //     product.orderDetail = {quantity: product.cartItem.quantity};
         //   return product;
        //} ));
await fetchedCart.setProducts(null);
//res.status(200).json(orderDetails);
res.status(200).json({message:'success'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
exports.getOrder= async(req, res) => {
    try{
    const orders= await req.user.getOrders({include: ['products']})
    res.status(200).json(orders)
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}
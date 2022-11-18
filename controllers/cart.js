const Product=require('../model/product');
/*exports.postCart=(req,res)=>{
    const productId=req.body.id;
    let fetchedCart;
    let newQuantity=1;

} */

exports.postCart = async(req, res) => {
    try{
        const productId = req.body.id;
        let fetchedCart;
        let newQuantity = 1; 
        console.log('zero');
        console.log(req.user.getCart());
        console.log('one');
        const cart= await req.user.getCart();
        console.log('two');
        fetchedCart = cart;

        //check if product is present
        const findProducts= await cart.getProducts({ where: { id: productId } });
        let product;
        if (findProducts.length > 0) {
            product = findProducts[0];
        }
        //update quantiy
        if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
        } 
        const products= await Product.findByPk(productId);
        await fetchedCart.addProduct(products, {through: { quantity: newQuantity }});
        return res.status(200).json({ message: 'Success', products});
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Failed' })
    };
        
}
exports.getCart=async(req,res)=>{
    try {
        const cart=await req.user.getCart();
        const product=await cart.getProducts();
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'failed'});
        
    }
}
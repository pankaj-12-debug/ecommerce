const Product= require('../model/product');

exports.getProducts = async (req, res) => {
    try{
        const ITEMS_PER_PAGE = 2;
        const page = +req.query.page || 1;
        
        const numProducts= await Product.findAll();
        let totalItems = numProducts.length;
        const products= await Product.findAll({ offset: ((page - 1) * ITEMS_PER_PAGE),  limit: ITEMS_PER_PAGE});
        res.status(200).json({ "products": products,'pagination': {
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        }})
       // console.log(products);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

exports.postProduct= async(req, res)=>{
    try{
        const {title, price, imageUrl}= req.body;
        await Product.create({title, price, imageUrl});
        res.sendStatus(201);
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}




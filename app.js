const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//database
const sequelize=require('./util/database')

//model
const Product=require('./model/product');
const User=require('./model/user');
const Cart=require('./model/cart');
const CartItem=require('./model/cart-item');
const Order=require('./model/order');
const OrderDetail=require('./model/order-detail');
//dummy user
app.use((req,res,next)=>{
User.findByPk(1).then(user=>{
    req.user=user;
   // console.log('user is working');
    //console.log(user);
    next();
}).catch(err=>{
    console.log(err);
})
})


//routes
const productRoutes=require('./routes/product');
const cartRoutes=require('./routes/cart');
const orderRoutes=require('./routes/order');

app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

//association
Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});
Order.belongsToMany(Product,{through:OrderDetail});
Product.belongsToMany(Order,{through:OrderDetail});

sequelize.sync().then(result=>{
    return User.findByPk(1);
    //app.listen(3000);
})
.then(user=>{
    if(!user)
    {
        return User.create({name:'pankaj', email:'pankaj@123' });
    }
    return user;
})
.then(user=>{
   // console.log(user);
    //app.listen(3000);
    return user.createCart();
})
.then(cart=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
    console.log('not work')
})

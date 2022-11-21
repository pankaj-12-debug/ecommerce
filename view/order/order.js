const orderDiv=document.getElementById('order');
window.addEventListener('DOMContentLoaded',()=>{
    axios.get(`http://localhost:3000/orders`).then(res=>{
        console.log(res.data);
        let totalPrice=0;
        res.data.forEach(order => {
            const pp=document.createElement('div');
            pp.setAttribute('id',`pp-${order.id}`);
            pp.setAttribute('class',`pp`);
            pp.innerHTML=`<h3 id="${order.id}">Order id: ${order.id}</h3>`
             orderDiv.appendChild(pp);
             order.products.forEach(product=>{
                const productDetails= document.createElement('div');
                productDetails.setAttribute('id', `product-${product.id}`)
                productDetails.setAttribute('class', `product`)
                productDetails.innerHTML = 
                        `<span><img src=${product.imageUrl}/></span>
                        <span>${product.title}</span>
                        <span>Rs.${product.price}</span>
                        <span>Quantity:${product.orderDetail.quantity}</span>`
                pp.appendChild(productDetails);
            })
        });
    }).catch(err=>{
        console.log(err);
    })
})
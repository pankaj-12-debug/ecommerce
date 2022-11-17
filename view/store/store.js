
window.addEventListener('DOMContentLoaded', () => {
// using DOM take product from backened and show in fronted
    axios.get(`http://localhost:3000/products`)
        .then(response => {
            // console.log(response.data);
            showProducts(response);
        })
        .catch(err => console.log(err));
    })


    function showProducts(response) {

        const div = document.getElementById('container-product');
        div.innerHTML = '';
    
        response.data.products.forEach(product => {
    
            const productHtml = `
            <div class='product' id='product'>
            <h4 id='${product.id}'>${product.title}</h4>
            <img id='${product.id}-img' src="${product.imageUrl}"
            alt="album cover">
            <br>
            <div id="single-product-bottom-wrapper" style="display:flex; justify-content:space-around;">
            <label id='${product.id}'>Rs.${product.price}</label>
            <button class="add-btn" id="add-btn">ADD TO CART</button>
            </div>
            </div>`;
    
            div.innerHTML += productHtml;
        });
    }    

// see- cart,cart and add-btn are work and taking cart post request
    document.getElementById('container-body').addEventListener('click', (e) => {

        const sideCart = document.getElementById('cart-float');
    
        if (e.target.id === 'cart-top' || e.target.id === 'see-cart') sideCart.style.display = 'block';
    
        if (e.target.id === 'cancel') sideCart.style.display = 'none';

        if (e.target.id === 'add-btn') {
            const id = e.target.parentNode.firstElementChild.id;
             console.log(id)
            const productName = e.target.parentNode.firstElementChild.innerText;
            
    
            axios.post('http://localhost:3000/cart', { 'id': id })
                .then(response => {
                    console.log(response.data);
    
                    //notification
                    const notifContainer = document.querySelector('.notif-div');
                    const notif = document.createElement('div');
                    notif.innerText = `${productName} has been added to cart`;
                    notifContainer.append(notif);
                    document.getElementById('container-body').append(notifContainer);
                    
    
                    setTimeout(() => {
                        notif.remove();
                    }, 1000);

                }).catch(err=>{
                    console.log(err);
                })
            }
    })

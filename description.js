document.addEventListener('DOMContentLoaded', function() {
    // Obtengo el producto que guardé en el sessionStorage
    const idOfProduct = parseInt(JSON.parse(sessionStorage.getItem('selected-product')))
    let prods = JSON.parse(sessionStorage.getItem('products'))
    const selectedProduct = prods.find(prod => prod.id === idOfProduct)

    if (selectedProduct) {
        const productContainer = document.querySelector('#product-container')    
        productContainer.innerHTML = `
            <article>
                <h1 class="prod-title">${selectedProduct.title}</h1>
                <p class="prod-category">Category: ${selectedProduct.category}</p>
                <p class="prod-description">${selectedProduct.description}</p>
                <div class="prod-price-container">
                    <p class="prod-count">Stock: ${selectedProduct.rating.count}</p>
                    <p class="prod-price">$${selectedProduct.price}</p>
                </div>
            </article>
            <img src="${selectedProduct.image}" alt="product-image" class="prod-image">
        `
    }
})
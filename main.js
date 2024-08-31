// Clase carrito
class Cart {
    #cart = localStorage.getItem('cart')
  
    constructor() {
      this.items = this.#cart ? JSON.parse(this.#cart) : []
      this.totalPrice = 0
    }
  
    //////   FUNCIONES   ///////

    updateTotalPrice() {
      const totalPrice = document.querySelector('.total-price')
      this.totalPrice = this.items.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
      )
      let total = Math.round(this.totalPrice)
      totalPrice.innerHTML = `<p>TOTAL: $${total}</p`
    }

    addProduct(productId) {
      //Busco el producto en específico y lo asigno también a la propiedad items del carrito
      const selectedProduct = products.find((prod) => prod.id === productId)
      const productCart = this.items.find((prod) => prod.id === productId)
  

      if (productCart) {
        productCart.quantity +=1
        Swal.fire({
          toast: true,
          title: 'Sumaste uno más',
          icon: 'success',
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        const newProduct = {
          quantity: 1,
          ...selectedProduct
        }
        this.items.push(newProduct)
        Swal.fire({
          toast: true,
          title: 'Agregaste un producto',
          icon: 'success',
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000
        })
      }
      this.updateCart()
    }
  
    removeProduct(productId) {
        const productCart = this.items.find((prod) => prod.id === productId)
        const updatedCart = this.items.filter((item) => item.id !== productId)
      
        if (productCart.quantity > 1) {
            productCart.quantity -=1
            Swal.fire({
            toast: true,
            title: 'Quitaste uno',
            icon: 'warning',
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 2000
            })
        } else if (productCart.quantity === 1){
            productCart.quantity = 0
            this.items = [...updatedCart]
            Swal.fire({
            toast: true,
            title: 'Eliminado. Ese era el último',
            icon: 'warning',
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 2000
            })
        } else {
            Swal.fire({
            toast: true,
            title: 'No hay existencias para eliminar',
            icon: 'info',
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 2000
            })
        }
        this.showCart()
    }

    
    async buyCart() {
      const cartContainer = document.querySelector('#cart-container')
      const cartStorage = localStorage.getItem('cart')
      const totalPrice = document.querySelector('.total-price')

      // Promesa para la compra del carrito, envío true y en la función buyCart verifico este valor
      const buyPromise = new Promise((resolve) => {
        resolve(
          true,
          Swal.fire({
            icon: 'info',
            text: 'Procesando compra',
            timer: 1600
          })
        )
      })

      let buyConfirmation = await buyPromise
      
      setTimeout(() => {
        // Si hay algo en el carrito y buyPromise es true, elimino el carrito del local storage, del 
        // html a la vez que reinicio el texto del total de la suma y muestro un cartel de confirmación
        if(cartStorage && buyConfirmation) {
          Swal.fire({
            toast: true,
            title: 'Gracias por tu compra',
            icon: 'success',
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 2000
          })
          cartContainer.innerHTML = ''
          totalPrice.innerHTML = `<p>TOTAL: $0</p>`
          localStorage.removeItem('cart')
        }
      }, 3400)

    }
    
    showCart() {
        this.updateCart()

        const cartContainer = document.querySelector('#cart-container')
        const cartList = JSON.parse(localStorage.getItem('cart'))

        if (cartContainer) {
          cartContainer.innerHTML = ''
          
          cartList.forEach(prod => {
              cartContainer.innerHTML += `
                  <section class="cart-product">
                      <p>${prod.title}</p>
                      <div class="product-info">
                          <p class="product-price">$${prod.price}</p
                          <p class="product-quantity">${prod.quantity}</p>
                      </div>
                      <button class="remove-product" data-id="${prod.id}">
                          <img src="./img/delete.png" alt="delete-icon">
                      </button>
                  </section>
              `
          })
        }
        if (cartList.length === 0) {
          cartContainer.innerHTML = '<p class="empty-cart">No hay elementos en tu carrito</p>';
        }

        const buyButton = document.createElement('button')
        buyButton.classList.add('buy-button')
        buyButton.innerHTML = 'Comprar'
        // Compruebo si estoy en la pagina de carrito para mostrar el boton de comprar
        if (cart) {
          cartContainer.appendChild(buyButton)
        }

        // Si el carrito no tiene elementos, se lanza una alerta con la API. 
        // Si sí tiene elementos ejecuta la función para comprarlo
        buyButton.addEventListener('click', () => {
          if (cartList.length > 0) {
            this.buyCart()
          } else {
            Swal.fire({
              toast: true,
              title: 'No hay elementos en tu carrito',
              icon: 'info',
              position: 'bottom-end',
              showConfirmButton: false,
              timer: 2000
            })
          }
        })

        // Evento para detectar el botón para eliminar y pasar la id
        const removeButtons = document.querySelectorAll('.remove-product')
        for (const button of removeButtons) {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'))
            this.removeProduct(productId)
        })
        }
    }

    updateCart() {
        const cartContainer = document.querySelector('#cart-container')
        const cartJSON = JSON.stringify(this.items)
        localStorage.setItem('cart', cartJSON)

        // Compruebo si estoy en la página del carrito para actualizar bien los precios
        if (cartContainer) {
          try {
            this.updateTotalPrice()
          } catch (error) {
            console.error('Error al actualizar precios', error)
          }
        }
    }
}

// Instacia de cart para la página del Carrito
const miCarrito = new Cart()

// Inicio el array
let products = []

//Consigo los productos desde mockAPI y los guardo en el array
const index = document.querySelector('.index-b')
const cart = document.querySelector('.cart-b')
const description = document.querySelector('.description-b')


/* 
    Verifico si estoy en el index o en el carrito
    Dentro de este if está la llamada a la API y la función showList del propio código
    para mostrar los productos y añadir además la posibilidad de mostrar la descripción 
    de cada uno y/o agregarlos al carrito. La cual es asícrona y utiliza la promesa
*/
if(index) {
  // Verifico la conección con AJAX
  fetch('https://66679550f53957909ff4ad8d.mockapi.io/prodar/products')
  .then(response => response.json())
  .then((list) => {
    products = list
    const promesaProductos = new Promise((resolve) => {
      resolve(products)
    })
    
    async function showList() {
      try {
        const backProducts = await promesaProductos
        const productsContainer = document.getElementById('article-container')
  
        // Desactivo el loader para cuando se vayan a imprimir los productos
        const loader = document.querySelector('.loader')
        loader.remove()
  
        productsContainer.innerHTML = ''
        for (const item of backProducts) {
          productsContainer.innerHTML += `
            <div class="card">
              <a class="more-button" href="./description.html" data-id="${item.id}">
                <p class="article-title">${item.title}</p>
              </a>
              <div class="price-container">
                <span class="article-price">$${item.price}</span>
                <div>
                  <button class="cart-button" data-id="${item.id}">
                    <img src="./img/cart-button.png" alt="logo cart">
                  </button>
                  <a class="more-button" data-id="${item.id}" href="./description.html">
                    <img src="./img/more.png" alt="logo more">
                  </a>
                </div>
              </div>            
            </div>
          `
        }
    
        // Evento para enviar datos y cargar la página description con el producto
        const moreButtons = document.querySelectorAll('.more-button')
        for (const button of moreButtons) {
          button.addEventListener('click', () => {
            sessionStorage.setItem('selected-product', JSON.stringify(button.getAttribute('data-id')))
            sessionStorage.setItem('products', JSON.stringify(products))
          })
        }
    
        // Evento para añadir al carrito
        const cartButtons = document.querySelectorAll('.cart-button')
        for (const button of cartButtons) {
          button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'))
            miCarrito.addProduct(productId)
            miCarrito.updateCart()
            miCarrito.showCart()
          })
        }
      } catch (error) {console.error('Error al cargar los productos', error)}
    }
    return showList()
  })
  .catch(error => {
    Swal.fire({
      icon: 'error',
      title: 'Algo salió mal al obtener los datos',
      text: 'Verifica tu conexión a internet, o intenta de nuevo',
    })
    console.error('*Error de promesa* Error al obtener los datos', error)
  })
}

// Verifico si estoy en la página del carrito para desactivar el loader y mostrar el carrito
if (cart) {
  try {
    const loader = document.querySelector('.loader')
    loader.remove()
    miCarrito.showCart()
  } catch (error) {console.error('Error al obtener los productos', error)}
}


// API Carrusel
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  allowTouchMove: true,
  autoplay: {
    delay: 2000,
    pauseOnMouseEnter: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  scrollbar: {
    el: '.swiper-scrollbar',
  },
})
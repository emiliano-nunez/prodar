# Proyecto Final JS

Este es un proyecto final de la diplomatura de desarrollo frontend de la UNTREF. Consiste en un sitio web de tienda en línea. El objetivo principal del proyecto es mostrar los conocimientos adquiridos durante el curso, en especial JavaScript.
Link: https://github.com/emiliano-nunez/prodar/deployments/github-pages

## Características
- **API Swiper:** Se utiliza la biblioteca Swiper para crear un carrusel de imágenes en la página principal.
- **Sweet Alert 2:** Se utiliza la biblioteca Sweet Alert 2 para mostrar mensajes informativos al usuario sobre sus acciones y el funcionamiento de la página en general.
- **API MockAPI:** Se utiliza una API de prueba para obtener los productos de la tienda.
- **Local Storage:** Los productos agregados al carrito se guardan en el almacenamiento local del navegador.
- **Clase Cart:** Se ha creado una clase llamada "Cart" para manejar la funcionalidad del carrito, como agregar productos, actualizar el precio total y eliminar productos.
- **Eventos de JavaScript:** Se utilizan eventos de JavaScript para agregar productos al carrito, actualizar el precio total y eliminar productos.

## Uso
1. Ve a la página principal y explora el carrusel de imágenes.
2. Haz clic en un producto para agregarlo al carrito.
3. Ve al carrito para ver tus productos y actualizar el precio total.
4. Puedes eliminar productos del carrito haciendo clic en el botón "Eliminar".
5. Haz clic en "Comprar" para procesar la compra y eliminar el carrito.
6. Puedes tocar en el botón "+" (más) para ver la descripción completa del producto que desees.

## Tecnologías utilizadas
- HTML
- CSS
- JavaScript
- Swiper
- MockAPI

## Uso de los eventos de JavaScript
 Se han utilizado eventos de JavaScript para agregar productos al carrito, actualizar el precio total y eliminar productos. Puedes encontrar más información sobre cómo utilizar los eventos de JavaScript en el archivo main.js.

## Problemas conocidos
Aquí hay algunos problemas conocidos que puedes encontrar al utilizar este proyecto:

- Si no tienes una conexión a internet, es posible que no puedas obtener los productos de la tienda.
- Si no tienes habilitado el almacenamiento local del navegador, no podrás guardar los productos agregados al carrito.

## Instacia de cart para la página del Carrito:

- Instancia de la clase Cart para la página del carrito.

- **Inicio el array:**
Inicializa un array llamado products.

- **Consigo los productos desde mockAPI y los guardo en el array:**
Realiza una solicitud a la API MockAPI para obtener los productos y los guarda en el array products.

- **Verifico si estoy en el index o en el carrito:**
Verifica si la página actual es la página principal o la página del carrito antes de realizar ciertas acciones.

-**Fetch con conexión AJAX a MockAPI:**
Realiza una solicitud utilizando fetch para obtener los productos de la API MockAPI mediante una conexión AJAX.

-**PromesaProductos:**
Crea una promesa para resolver la lista de productos obtenida.

-**Mostrar productos en la interfaz:**
Itera sobre los productos obtenidos y muestra cada producto en la interfaz con su información respectiva.


## Autor
Emiliano Abel Núñez

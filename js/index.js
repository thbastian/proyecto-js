const contenedorProductos = document.getElementById("container-productos");

function crearProductosDelInicio(productos){
    productos.forEach(producto => {
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList = "nuestrosProductos";
        nuevoProducto.innerHTML = `
        <img src="./img/fotos/${producto.id}.jfif">
        <h3 class="detalle">${producto.nombre}</h3>
        <p class="detalle">$${producto.precio}</p>
        <button id="agregar">agregar al carrito</button>
        `
        contenedorProductos.appendChild(nuevoProducto);
        nuevoProducto.getElementsByTagName("button")[0].addEventListener("click",()=> agregarAlCarrito(producto));
    });
}
crearProductosDelInicio(muebles);

const notificacion = document.querySelector("#agregar");
notificacion.addEventListener("click", ()=> {
    Toastify({
        text: "Agregado",
        duration: 3000,
        destination: "#",
        newWindow: true,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
})
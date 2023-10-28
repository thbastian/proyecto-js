const contenedorProductos = document.getElementById("container-productos");
const unidad = document.getElementById("unidades");
const precios = document.getElementById("precio");
const carritoVacio = document.getElementById("carrito-vacio");
const totalesDelCarrito = document.getElementById("totales");
const vaciarCarrito = document.getElementById("reiniciar");

function crearProductosDelInicio(){
    contenedorProductos.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("muebles"));
    console.log(productos);
    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            const nuevoProducto = document.createElement("div");
            nuevoProducto.classList = "nuestrosProductos";
            nuevoProducto.innerHTML = `
            <img src="../img/fotos/${producto.id}.jfif">
            <h3 class="detalle">${producto.nombre}</h3>
            <p class="detalle">$${producto.precio}</p>
            <div>
            <button>-</button>
            <span>${producto.cantidad}</span>
            <button>+</button>
            </div>
            `
            contenedorProductos.appendChild(nuevoProducto);
            nuevoProducto
            .getElementsByTagName("button")[1]
            .addEventListener("click", (e)=> {
                agregarAlCarrito(producto);
                const numeroCarrito = e.target.parentElement.getElementsByTagName("span")[0];
                numeroCarrito.innerText = agregarAlCarrito(producto);
                total();
            });
            nuevoProducto
            .getElementsByTagName("button")[0]
            .addEventListener("click", (e)=> {
                restarAlCarrito(producto);   
                crearProductosDelInicio()
                total();
            });
        });
    }
}
crearProductosDelInicio();
total();

function total(){
    const productos = JSON.parse(localStorage.getItem("muebles"));
    let unidades = 0;
    let precio = 0;
    if(productos && productos.length>0){
        productos.forEach(producto => {
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        })
        unidad.innerText = unidades;
        precios.innerText = precio;
    }
    ocultarCarrito();
}

function ocultarCarrito(){
    const productos = JSON.parse(localStorage.getItem("muebles"));
    console.log(productos,productos == true);
    carritoVacio.classList.toggle("ocultar",productos && productos.length>0);
    totalesDelCarrito.classList.toggle("ocultar",!(productos && productos.length>0));
}

ocultarCarrito();

vaciarCarrito.addEventListener("click",reiniciarCarrito);
function reiniciarCarrito(){
    localStorage.removeItem("muebles");
    total();
    crearProductosDelInicio();
}

function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("muebles"));
    console.log(memoria);
    let numeroCarrito = 0;
    if(!memoria) {
        const nuevoProductos = nuevoProductoParaMemoria(producto);
        localStorage.setItem("muebles",JSON.stringify([nuevoProductos]));
        numeroCarrito = 1;
    }else {
        const indiceProducto = memoria.findIndex(muebles => muebles.id === producto.id);
        console.log(indiceProducto);
        const nuevaMemoria = memoria; 
        if(indiceProducto === -1) {
            nuevaMemoria.push(nuevoProductoParaMemoria(producto));
            numeroCarrito = 1;
        }else {
            nuevaMemoria[indiceProducto].cantidad ++;
            numeroCarrito = nuevaMemoria[indiceProducto].cantidad;
        }
        localStorage.setItem("muebles",JSON.stringify(nuevaMemoria));
    }
    actualizarNumeroDelCarrito();
    return numeroCarrito;
}

function restarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("muebles"));
    const indiceProducto = memoria.findIndex(muebles => muebles.id === producto.id);
    if(memoria[indiceProducto].cantidad === 1) {
        memoria.splice(indiceProducto,1);
    }else{
        memoria[indiceProducto].cantidad--;
    }
    localStorage.setItem("muebles",JSON.stringify(memoria));
    actualizarNumeroDelCarrito();
}

function nuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

const contadorDelCarritoElement = document.getElementById("contadorDelCarrito");
function actualizarNumeroDelCarrito(){
    const memoria = JSON.parse(localStorage.getItem("muebles"));
    if(memoria && memoria.lenght > 0){
        const numeroDelCarrito = memoria.reduce((acum, current) => acum+current.cantidad,0 );
        contadorDelCarritoElement.innerText = numeroDelCarrito;
        console.log(numeroDelCarrito);
    }else{
        contadorDelCarritoElement.innerText = 0;
    }
}

actualizarNumeroDelCarrito()
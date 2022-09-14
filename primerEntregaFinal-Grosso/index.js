// let listaProductos = [tipo, precio, cantidad]

class producto {
    constructor(nombre, precioCompra, precioVenta, cantidad){
        this.nombre = nombre;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.cantidad = cantidad;
    }
    calcularCosto = () => this.cantidad * this.precioCompra;
}

function agregarProductos () {
    let numeroProductos = parseInt(prompt("cuantos productos desea?"));
    let productos = [];
    for (let index = 0; index < numeroProductos; index++) {
        let nombre = prompt("ingrese el nombre: ");
        let precioCompra = parseFloat(prompt("ingrese el precio de compra: "));
        let precioVenta = parseFloat(prompt("ingrese el precio de venta: "));
        let cantidad = parseInt(prompt("ingrese la cantidad: "));

        let productoARegistrar = new producto(nombre, precioCompra, precioVenta, cantidad);

        productos.push(productoARegistrar)
    }

    return productos
}

function mostrarProductos(productos){
    for (let producto of productos){
        console.log(producto);
        console.log(producto.nombre);
    }
}

function calcularCosto (productos){
    let sumatoriaCosto = 0
    for (let producto of productos){
        sumatoriaCosto += producto.calcularCosto();
    }
    return sumatoriaCosto
}




function main() {
    let productos = agregarProductos();
    mostrarProductos(productos);
    let costoAlmacen = calcularCosto(productos);
    alert("El costo total es: " +"$"+ costoAlmacen);
}
  
main()
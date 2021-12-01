const productosJSON = "productos.json";
class producto {
    constructor(id, nombre, precio, img) {
        (this.id = id), (this.nombre = nombre), (this.precio = precio), (this.img = img);
    }
}

let carrito = [];
console.log(carrito);

function traerDatos() {
    //console.log('dentro de la funcion');
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", productosJSON, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            let productos = JSON.parse(this.responseText);
            productos.forEach((prod) => {
                $("#contenedorProductos").append(`<div class="card p-3 m-2">
                <div class="card-body">
                <h5 class="card-title">${prod.nombre}</h5>
                <h5 class="card-title"> Codigo: ${prod.id}</div>
                <p class="card-text"><p> llevalo por solo <strong>$${prod.precio}</strong></p>
                <img src="${prod.img}" alt="${prod.nombre}" class="imgProductos" >
                <button id ="agregar${prod.id}" class="btn btn-primary">Comprar por $${prod.precio}</a></button>
                <div>
                <p id="animacion${prod.id}agregada" class="agregado text-center fw-bold m-3" style="display: none">Se agregó al carrito</p>
                <p id="animacion${prod.id}carrito" class="ver-carrito text-center fw-bold m-3" style="display: none">Mira tu lista en el carrito</p>
                </div>
                </div></div>`);

                $(`#agregar${prod.id}`).on("click", () => {
                    agregarCarrito(prod.id);
                });
                $(`#agregar${prod.id}`).on("click", function () {
                    $(`#animacion${prod.id}agregada`)
                        .css("color", "#000")
                        .css("font-size", "20px")
                        .fadeIn(1000)
                        .delay(1000)
                        .fadeOut(1000);
                        $(`#animacion${prod.id}carrito`)
                        .css("color", "#000")
                        .css("font-size", "20px")
                        .delay(3000)
                        .fadeIn(1000)
                        .fadeOut(1000);
                        
                        numeroEnCarrito();
                        sumarTotal();

                        
                    });
                    let agregarCarrito = (id) => {
                        const item = productos.find((prod) => prod.id == id);
                    carrito.push(item);
                    sumarTotal();
                    numeroEnCarrito();
                    }
                });
                
            }
        }
    }
    console.log(carrito);

    function numeroEnCarrito() {
        //Numero de productos en el carrito
    $(`#nro-carrito`).ready(function () {
        let cantidadProducto = document.getElementById("nro-carrito");
        cantidadProducto.innerHTML = `<p id="nro-carrito">${carrito.length}</p>`;
    });
}
function sumarTotal() {
    //actualizar total
    if (carrito == 0) {
        imprimirTotal.innerHTML = `Total a pagar $0`;
        mostrarTotal.prepend(imprimirTotal);
    } else {
        let total = 0;
        for (const sumaCarrito of carrito) {
            total = total + sumaCarrito.precio;
            //console.log(total);
            
            if (carrito.length != 0) {
                imprimirTotal.innerHTML = `Total a pagar $${total}`;
                mostrarTotal.prepend(imprimirTotal);
            }
        }
    }
};
    
    
    let mostrarTotal = document.getElementById("mostrarTotal");
let imprimirTotal = document.createElement("p");
imprimirTotal.classList.add("text-center");
imprimirTotal.classList.add("fw-bold");
imprimirTotal.classList.add("m-auto");



//titulo con vanilla js

titulo = document.getElementById("titulo");
titulo.innerHTML = "<h1> Tienda de Zapatillas Online <h1>";
titulo.classList.add("text-center");
titulo.classList.add("text-titulo");

//prueba con create element
let subTitulo = document.createElement("h5");
subTitulo.innerHTML = "Lista de Precios";
subTitulo.classList.add("text-center");
titulo.appendChild(subTitulo);

traerDatos();
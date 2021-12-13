const vaciarCarrito = document.getElementById("vaciar-carrito");
const contenedorCarrito = document.getElementById("carrito-contenedor");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");
const filtroSexo = document.getElementById("filtroSexo");

vaciarCarrito.addEventListener("click", () => {
    carrito.length = 0;
    vistaCarrito();
    
});

let carrito = [];


let productos = [];
const cargarDatos = async () => {
    const resp = await fetch("./productos.json");
    const data = await resp.json();
    productos = data;
    mostrarProductos(productos);
};

cargarDatos();

function mostrarProductos(productos) {
    productos.forEach((prod) => {
        $("#contenedorProductos").append(`<div class="card p-3 m-2">
                <div class="card-body">
                <h5 class="card-title">${prod.nombre}</h5>
                <h5 class="card-title"> Codigo: ${prod.id}</div>
                <p class="card-text"><p> Para <strong>${prod.sexo}</strong></p>
                <img src="${prod.img}" alt="${prod.nombre}" class="imgProductos" >
                <button id ="agregar${prod.id}" class="btn btn-primary">Comprar por $${prod.precio} <i class="fas fa-shopping-cart"></i></a> </button>
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
            $(`#animacion${prod.id}carrito`).css("color", "#000").css("font-size", "20px").delay(3000).fadeIn(1000).fadeOut(1000);
        });
        const agregarCarrito = (prodId) => {
            const item = productos.find((prod) => prod.id === prodId);
            carrito.push(item);
            console.log(carrito);
            vistaCarrito();
        };
    });
}
/*     }
    } */

/* Modal */
let abrirModal = document.getElementById("verCarrito");
let cerrarModal = document.getElementById("carritoCerrar");
let modalContainer = document.getElementById("modal-container");
let modalCarrito = document.getElementById("modal");

//Funciona para abrir modal

abrirModal.addEventListener("click", () => {
    modalContainer.classList.toggle("modal-active");
});

//funcion para cerrar modal
cerrarModal.addEventListener("click", () => {
    modalContainer.classList.toggle("modal-active");
});

// funcion para cerrar modal con click fuera del modal
modalContainer.addEventListener("click", () => {
    cerrarModal.click();
});

//detenemos propagacion de eventos
modalCarrito.addEventListener("click", (e) => {
    e.stopPropagation();
});

//Carrito en modal

const vistaCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((prod) => {
        const div = document.createElement("div");
        div.classList.add("productoEnCarrito");
        div.innerHTML = ` <img src="${prod.img}" alt="${prod.nombre}" class="imgProductosCarrito" >
                    <p>${prod.nombre}</p>
                    <p>Precio: $${prod.precio}</p>
                    <button onclick= "eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`;
        contenedorCarrito.appendChild(div);
    });
    contadorCarrito.innerText = carrito.length;
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0);
};
//Eliminar producto del modal Carrito
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    vistaCarrito();
    console.log(carrito);
};

//Filtro por sexo
filtroSexo.addEventListener("change", () => {
    filtrarProductos();
});

function filtrarProductos() {
    const value = filtroSexo.value;
    if (value === "todos") {
        traerDatos(producto);
    } else {
        const filtrado = productosJSON.filter((prod) => prod.sexo === value);
        console.log(filtrado);
    }
}

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

/* traerDatos();
 */

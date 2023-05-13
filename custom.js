// Creación de Variables Globales
let arrayCatalogo = [];
let numPage;

// Leer parámetros URL
let parametrosURL = new URLSearchParams(location.search);

// Comprobar página
if (parseInt(parametrosURL.get("page")) == 1 || parametrosURL.get("page") == null) {
    numPage = 1;
} else {
    numPage = parseInt(parametrosURL.get("page"));
}

// Solicitar datos al servidor
fetch("productos.json")
    .then(respuesta => respuesta.json())
    .then(objeto => {
        arrayCatalogo = objeto;
        cargarCatalogo(numPage);
    })
    .catch(error => {
        console.error("Error al cargar el catálogo:", error);
    });

// Definir función para cargar el catálogo
function cargarCatalogo(pagina) {
    let filaCatalogo = document.querySelector("#catalogo");

    let inicio = (pagina - 1) * 8;
    let final;
    let tmbfinal = pagina + 8;

    if (arrayCatalogo.length < tmbfinal) {
        final = arrayCatalogo.length;
    } else {
        final = tmbfinal;
    }

    for (let index = inicio; index < final; index++) {
        let nombre = arrayCatalogo[index].name;
        let nomImage = arrayCatalogo[index].image;
        let precio = arrayCatalogo[index].price;
        let oferta = arrayCatalogo[index].offer * 100;
        let precioFinal = precio - (precio * oferta / 100);

        let nuevoElemento = document.createElement("article");
        nuevoElemento.setAttribute("class", "col-xs-12 col-sm-6 col-md-4 col-xl-3");
        nuevoElemento.innerHTML =
            `
        <picture>
          <img class="img-fluid" src="image/productos/${nomImage}" alt="${nombre}">
        </picture>
        <h4>${nombre}</h4>
        <p>
          <span class="precioOriginal">S/ ${precio}</span>
          <span class="precioDescuento">-${oferta}%</span> <br>
          <span class="precioFinal">S/ ${precioFinal}</span>
        </p>
        <button onclick="agregarAlCarrito('${nombre}', '${nomImage}', ${precioFinal})" class="btn btn-light">
          <i class="bi bi-plus-square"></i> 
          Agregar Carrito 
        </button>
        `;

        filaCatalogo.appendChild(nuevoElemento);
    }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, imagen, precio) {
    let carritoVacio = document.querySelector("#carritoVacio");
    let productosCarrito = document.querySelector("#productosCarrito");

    let nuevoProducto = document.createElement("div");
    nuevoProducto.setAttribute("class", "producto-carrito");
    nuevoProducto.innerHTML =
        `
    <img class="img-fluid" src="image/productos/${imagen}" alt="${nombre}">
    <h5>${nombre}</h5>
    <p>Precio: S/ ${precio}</p>
    `;

    productosCarrito.appendChild(nuevoProducto);

    carritoVacio.style.display = "none";
}

// Función para limpiar el carrito
function limpiarCarrito() {
    let productosCarrito = document.querySelector("#productosCarrito");
    productosCarrito.innerHTML = "";

    let carritoVacio = document.querySelector("#carritoVacio");
    carritoVacio.style.display = "none";
}

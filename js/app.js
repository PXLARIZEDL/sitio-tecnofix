// =========================================================
// app.js - TecnoFix RD
// un solo script pa las 3 paginas, se carga con defer
// =========================================================

// ---------- 1. Menu hamburguesa ----------
const botonMenu = document.querySelector(".menu-boton");
const menu = document.querySelector(".menu");

// abre y cierra el menu en el celular y le dice al lector de pantalla si ta abierto
function alternarMenu() {
    const abierto = menu.classList.toggle("abierto");
    botonMenu.setAttribute("aria-expanded", abierto);
}

if (botonMenu && menu) {
    botonMenu.addEventListener("click", alternarMenu);
}

// ---------- 2. Modo oscuro ----------
const botonTema = document.querySelector(".tema-boton");

// pone o quita la clase oscuro en el body y cambia el texto del boton
function aplicarTema(tema) {
    const oscuro = tema === "oscuro";
    document.body.classList.toggle("oscuro", oscuro);
    botonTema.textContent = oscuro ? "Modo claro" : "Modo oscuro";
}

// cambia el tema y lo guarda en localStorage pa q se acuerde al cambiar de pagina
function alternarTema() {
    const nuevoTema = document.body.classList.contains("oscuro") ? "claro" : "oscuro";
    localStorage.setItem("tema", nuevoTema);
    aplicarTema(nuevoTema);
}

if (botonTema) {
    aplicarTema(localStorage.getItem("tema"));
    botonTema.addEventListener("click", alternarTema);
}

// ---------- 3. Año automatico en el footer ----------
const anio = document.querySelector(".anio");

if (anio) {
    anio.textContent = new Date().getFullYear();
}

// ---------- 4. Boton de volver arriba ----------
const botonArriba = document.querySelector(".arriba");

// el boton sale cuando uno baja mas de 300px
function revisarScroll() {
    botonArriba.classList.toggle("visible", window.scrollY > 300);
}

function subirArriba() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

if (botonArriba) {
    window.addEventListener("scroll", revisarScroll);
    botonArriba.addEventListener("click", subirArriba);
}

// ---------- 5. Catalogo de servicios (servicios.html) ----------
// los mismos servicios y precios de la tabla
const servicios = [
    { nombre: "Limpieza interna y pasta térmica", categoria: "Laptop", precio: 1500, descripcion: "Quitamos el polvo del ventilador y cambiamos la pasta térmica para que no se caliente.", imagen: "img/laptop.svg", alt: "Dibujo de una laptop abierta con la pantalla azul" },
    { nombre: "Cambio de pantalla", categoria: "Laptop", precio: 2000, descripcion: "Cambiamos la pantalla rota, con rayas o con manchas. Se entrega en 2 días.", imagen: "img/laptop.svg", alt: "Dibujo de una laptop abierta con la pantalla azul" },
    { nombre: "Cambio de teclado", categoria: "Laptop", precio: 1200, descripcion: "Para teclas que no responden o un teclado que se mojó.", imagen: "img/laptop.svg", alt: "Dibujo de una laptop abierta con la pantalla azul" },
    { nombre: "Cambio de batería", categoria: "Laptop", precio: 900, descripcion: "Para la laptop que solo funciona conectada al cargador.", imagen: "img/laptop.svg", alt: "Dibujo de una laptop abierta con la pantalla azul" },
    { nombre: "Cambio de fuente de poder", categoria: "PC de escritorio", precio: 800, descripcion: "Cuando la PC no prende o se apaga sola.", imagen: "img/pc.svg", alt: "Dibujo de un monitor al lado de una torre de computadora" },
    { nombre: "Instalación de tarjeta de video", categoria: "PC de escritorio", precio: 700, descripcion: "Instalamos la tarjeta y sus controladores el mismo día.", imagen: "img/pc.svg", alt: "Dibujo de un monitor al lado de una torre de computadora" },
    { nombre: "Instalación de SSD con Windows", categoria: "Mejoras", precio: 1800, descripcion: "Cambiamos el disco viejo por un SSD e instalamos Windows.", imagen: "img/mejoras.svg", alt: "Dibujo de una memoria verde con cuatro chips negros" },
    { nombre: "Instalación de memoria RAM", categoria: "Mejoras", precio: 500, descripcion: "Más memoria para que el equipo no se ponga lento con muchas pestañas.", imagen: "img/mejoras.svg", alt: "Dibujo de una memoria verde con cuatro chips negros" },
    { nombre: "Formateo e instalación de Windows", categoria: "Software y archivos", precio: 1000, descripcion: "Borramos todo e instalamos Windows limpio, como de tienda.", imagen: "img/software.svg", alt: "Dibujo de una ventana con una barra de progreso verde" },
    { nombre: "Recuperación de archivos", categoria: "Software y archivos", precio: 2500, descripcion: "Intentamos rescatar fotos y documentos de discos dañados o borrados.", imagen: "img/software.svg", alt: "Dibujo de una ventana con una barra de progreso verde" }
];

const listaTarjetas = document.querySelector(".tarjetas");
const buscador = document.querySelector("#buscar");
const filtroCategoria = document.querySelector("#categoria");
const contador = document.querySelector(".contador");

// pone el precio en pesos dominicanos, ej: RD$1,500.00
function formatearPrecio(precio) {
    return precio.toLocaleString("es-DO", { style: "currency", currency: "DOP" });
}

// borra las tarjetas y crea una x cada servicio del arreglo q le paso
function pintarTarjetas(lista) {
    listaTarjetas.innerHTML = "";

    lista.forEach(function (servicio) {
        const tarjeta = document.createElement("li");
        tarjeta.classList.add("tarjeta");
        tarjeta.innerHTML = `
            <img src="${servicio.imagen}" alt="${servicio.alt}" width="300" height="180">
            <h3>${servicio.nombre}</h3>
            <p>${servicio.categoria}</p>
            <p>${servicio.descripcion}</p>
            <p class="precio">${formatearPrecio(servicio.precio)}</p>
        `;
        listaTarjetas.appendChild(tarjeta);
    });

    if (lista.length === 0) {
        contador.textContent = "No encontramos servicios con esa búsqueda. Prueba con otra palabra o elige «Todas».";
    } else {
        contador.textContent = `Mostrando ${lista.length} de ${servicios.length} servicios`;
    }
}

// junta el texto del buscador y la categoria y se queda con los q coinciden
function filtrarCatalogo() {
    const texto = buscador.value.trim().toLowerCase();
    const categoria = filtroCategoria.value;

    const resultado = servicios.filter(function (servicio) {
        const coincideTexto = servicio.nombre.toLowerCase().includes(texto) || servicio.descripcion.toLowerCase().includes(texto);
        const coincideCategoria = categoria === "todas" || servicio.categoria === categoria;
        return coincideTexto && coincideCategoria;
    });

    pintarTarjetas(resultado);
}

if (listaTarjetas) {
    pintarTarjetas(servicios);
    buscador.addEventListener("input", filtrarCatalogo);
    filtroCategoria.addEventListener("change", filtrarCatalogo);
}

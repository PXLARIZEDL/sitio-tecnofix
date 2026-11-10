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

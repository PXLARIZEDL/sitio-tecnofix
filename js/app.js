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

// ---------- 6. Validacion del formulario (contacto.html) ----------
const formulario = document.querySelector(".formulario");
const mensajeExito = document.querySelector(".exito");

// escribe el mensaje en el span del error y le pone la clase invalido al campo
function mostrarError(idError, mensaje) {
    document.getElementById(idError).textContent = mensaje;
    formulario.querySelectorAll(`[aria-describedby="${idError}"]`).forEach(function (campo) {
        campo.classList.add("invalido");
    });
}

// borra el mensaje y quita la clase invalido
function limpiarError(idError) {
    document.getElementById(idError).textContent = "";
    formulario.querySelectorAll(`[aria-describedby="${idError}"]`).forEach(function (campo) {
        campo.classList.remove("invalido");
    });
}

// regla propia 1: telefono dominicano, empieza con 809, 829 o 849 y 7 numeros mas
function validarTelefono(telefono) {
    return /^(809|829|849)-?[0-9]{3}-?[0-9]{4}$/.test(telefono.trim());
}

// regla propia 2: la fecha no puede ser antes de hoy
function esFechaPasada(texto) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return new Date(texto + "T00:00") < hoy;
}

// regla propia 3: los domingos el taller ta cerrado
function esDomingo(texto) {
    return new Date(texto + "T00:00").getDay() === 0;
}

// revisa campo x campo, si algo ta mal pone el error y devuelve false
function validarFormulario() {
    const datos = formulario.elements;
    let valido = true;

    // primero borro los errores viejos pa q no se queden pegaos
    formulario.querySelectorAll(".error").forEach(function (span) {
        limpiarError(span.id);
    });

    if (datos.nombre.value.trim().length < 3) {
        mostrarError("error-nombre", "Escribe tu nombre completo (mínimo 3 letras).");
        valido = false;
    }

    if (datos.correo.value.trim() === "" || !datos.correo.validity.valid) {
        mostrarError("error-correo", "Escribe un correo válido, por ejemplo nombre@gmail.com.");
        valido = false;
    }

    if (!validarTelefono(datos.telefono.value)) {
        mostrarError("error-telefono", "El teléfono debe empezar con 809, 829 o 849 y tener 10 dígitos.");
        valido = false;
    }

    if (datos.servicio.value === "") {
        mostrarError("error-servicio", "Elige el servicio que necesitas.");
        valido = false;
    }

    if (datos.marca.value === "") {
        mostrarError("error-marca", "Elige la marca de tu equipo.");
        valido = false;
    }

    if (datos.fecha.value === "") {
        mostrarError("error-fecha", "Elige la fecha en que traerás el equipo.");
        valido = false;
    } else if (esFechaPasada(datos.fecha.value)) {
        mostrarError("error-fecha", "La fecha no puede ser en el pasado.");
        valido = false;
    } else if (esDomingo(datos.fecha.value)) {
        mostrarError("error-fecha", "Los domingos estamos cerrados. Elige otro día.");
        valido = false;
    }

    if (datos.problema.value.trim().length < 10) {
        mostrarError("error-problema", "Cuéntanos el problema con al menos 10 letras.");
        valido = false;
    }

    return valido;
}

// si todo ta bien enseña el resumen y limpia el formulario, si no, no se envia
function enviarFormulario(evento) {
    evento.preventDefault();
    mensajeExito.textContent = "";

    if (!validarFormulario()) {
        return;
    }

    const datos = formulario.elements;
    const servicio = datos.servicio.options[datos.servicio.selectedIndex].text;
    const fecha = new Date(datos.fecha.value + "T00:00").toLocaleDateString("es-DO");

    mensajeExito.textContent = `¡Gracias, ${datos.nombre.value.trim()}! Recibimos tu solicitud de ${servicio} para tu equipo ${datos.marca.value} el ${fecha}. Te llamaremos al ${datos.telefono.value.trim()} para confirmar.`;
    formulario.reset();
}

// cuando la persona corrige un campo se le quita el error
function revisarCampo(evento) {
    const idError = evento.target.getAttribute("aria-describedby");
    if (idError) {
        limpiarError(idError);
    }
}

if (formulario) {
    formulario.addEventListener("submit", enviarFormulario);
    formulario.addEventListener("input", revisarCampo);
}

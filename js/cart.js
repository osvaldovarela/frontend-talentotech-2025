/**
 CART.JS
 Encargado de la lógica de datos: LocalStorage y cálculos matemáticos.
 Se debe incluir en TODAS las páginas.
 */

const CLAVE_CARRITO = "carrito-compras-talento-tech";

// 1. Inicializar el contador apenas carga el archivo
actualizarNumeroCarrito();

/** Devuelve la lista de productos guardada*/
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
}

/** Guarda el array de productos en el navegador */
function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarNumeroCarrito(); // Actualizamos el contador automáticamente
}

/** Agrega un producto o suma cantidad si ya existe */
function agregarAlCarrito(productoNuevo) {
  const memoria = obtenerCarrito();
  const indice = memoria.findIndex((p) => p.id === productoNuevo.id);

  if (indice === -1) {
    // Si es nuevo, lo agregamos
    memoria.push(productoNuevo);
  } else {
    // Si ya existe, sumamos la cantidad
    memoria[indice].cantidad += productoNuevo.cantidad;
  }

  guardarCarrito(memoria);
}

/** Resta cantidad. Si llega a 0, elimina el producto */
function restarDelCarrito(id) {
  const memoria = obtenerCarrito();
  const indice = memoria.findIndex((p) => p.id === id);

  if (indice !== -1) {
    memoria[indice].cantidad--;

    // Si la cantidad es 0 o menos, borramos el producto del arreglo
    if (memoria[indice].cantidad <= 0) {
      memoria.splice(indice, 1);
    }
    guardarCarrito(memoria);
  }
}

/** Borra todo el carrito */
function reiniciarCarrito() {
  localStorage.removeItem(CLAVE_CARRITO);
  actualizarNumeroCarrito();
}

/** Actualiza el numerito rojo del menú */
function actualizarNumeroCarrito() {
  const cuentaElement = document.getElementById("cuenta-carrito");
  if (cuentaElement) {
    const memoria = obtenerCarrito();

    const total = memoria.reduce((acc, item) => acc + item.cantidad, 0);
    cuentaElement.textContent = total;
  }
}

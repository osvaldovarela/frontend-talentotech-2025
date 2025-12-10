document.addEventListener("DOMContentLoaded", () => {
  // 1. Si existe el contenedor de detalle, carga esa lógica y hace  la petición
  if (document.getElementById("product-detail")) cargarPaginaDetalle();

  // 2. Si existe el contenedor de carrito, carga esa lógica y hace la petición
  if (document.getElementById("cart-container")) cargarPaginaCarrito();
});

/** LÓGICA DE DESCRIPTION.HTML */
async function cargarPaginaDetalle() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const producto = await res.json();

  document.getElementById("product-detail").innerHTML = `
    <h1>${producto.title}</h1>
    <h2 class="price">$${producto.price}</h2>
    <p>${producto.description}</p>
  `;
  document.getElementById("img-producto").src = producto.images[0];

  // Lógica del botón agregar
  const btn = document.querySelector(".btn-add-to-cart");
  btn.addEventListener("click", () => {
    const cantidad =
      parseInt(document.querySelector(".input-quantity").value) || 1;
    agregarAlCarrito({ ...producto, img: producto.images[0], cantidad });

    btn.textContent = "¡Agregado!"; // prueba de feedback
    setTimeout(() => (btn.textContent = "Agregar al carrito"), 2000);
  });
}

/** LÓGICA DE CART.HTML */
function cargarPaginaCarrito() {
  const container = document.getElementById("cart-container");
  const productos = obtenerCarrito(); // Función que viene de cart.js

  // 1. Manejo de carrito vacío
  if (productos.length === 0) {
    document.getElementById("carrito-vacio").style.display = "block";
    document.getElementById("totales").style.display = "none";
    container.innerHTML = "";
    return;
  }

  // 2. Dibujamos TODO el carrito usando .map() (Genera una lista)
  container.innerHTML = productos
    .map(
      (p) => `
    <div class="cart-card border-bottom py-3 d-flex align-items-center">
      <img src="${p.img}" alt="${
        p.title
      }" style="width:80px; height:80px; object-fit:cover" class="me-3">
      <div class="flex-grow-1">
        <h5 class="mb-0">${p.title}</h5>
        <small class="text-muted">$${p.price} x ${p.cantidad}</small>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-secondary btn-accion" data-id="${
          p.id
        }" data-op="-">-</button>
        <span class="mx-2">${p.cantidad}</span>
        <button class="btn btn-sm btn-outline-secondary btn-accion" data-id="${
          p.id
        }" data-op="+">+</button>
      </div>
      <div class="ms-3 fw-bold">$${(p.price * p.cantidad).toFixed(2)}</div>
    </div>
  `
    )
    .join("");

  // 3. Totales
  const total = productos.reduce((sum, p) => sum + p.price * p.cantidad, 0);
  const totalUnidades = productos.reduce((sum, p) => sum + p.cantidad, 0);
  document.getElementById("precio").textContent = total.toFixed(2);
  document.getElementById("cantidad").textContent = totalUnidades;
  document.getElementById("carrito-vacio").style.display = "none";
  document.getElementById("totales").style.display = "block";

  // 4. Delegación de Eventos: Un solo listener para todos los botones
  container.onclick = (e) => {
    if (e.target.classList.contains("btn-accion")) {
      const id = parseInt(e.target.dataset.id);
      const op = e.target.dataset.op;

      if (op === "+") {
        const item = productos.find((p) => p.id === id);
        agregarAlCarrito({ ...item, cantidad: 1 });
      } else {
        restarDelCarrito(id);
      }
      cargarPaginaCarrito();
    }
  };

  // Botón reiniciar
  document.getElementById("reiniciar")?.addEventListener("click", () => {
    reiniciarCarrito();
    cargarPaginaCarrito();
  });
}

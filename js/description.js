function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Función para cargar el producto basado en el ID
async function loadProductDetails() {
  const productId = getQueryParam("id"); // obtiene el ID del producto de la URL
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    const product = data.products.find((p) => p.id === parseInt(productId)); // busca el producto por ID

    if (product) {
      displayProduct(product); // muestra el producto
    } else {
      console.log("Producto no encontrado");
    }
  } catch (error) {
    console.log("Error al cargar el producto", error);
  }
}

// Función para mostrar el producto en una tarjeta
function displayProduct(product) {
  const productContainer = document.getElementById("product-detail"); // contenedor donde se mostrará el producto
  productContainer.innerHTML = `
    <div class="card">
      <div class="card-media">
        <div class="cover">
          <img src="${product.images[0]}" alt="${product.title}" />
        </div>
      </div>
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <p>${product.description}</p> <!-- descripción del producto -->
    </div>
  `;
}

// Llama a la función para cargar los detalles del producto
loadProductDetails();

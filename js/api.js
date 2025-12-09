// traer los productos de la API (https://dummyjson.com/products | https://fakestoreapi.com/products) y mostrarlos en el HTML.
async function loadProduct() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    printProducts(data.products);
  } catch (error) {
    console.log("Error al cargar los products", error);
  }
}

function printProducts(products) {
  // obtiene el contenedor donde se insertarán las tarjetas de productos
  const productList = document.getElementById("product-list");

  // itera sobre cada producto del array
  products.forEach((product) => {
    // crea un elemento <a> que será la tarjeta
    const card = document.createElement("a");
    // añade la clase "card" al elemento <a> para aplicar estilos CSS
    card.classList.add("card");
    // establece el atributo href (href="#" por defecto)
    card.href = "#";

    // inserta el HTML interno de la tarjeta con la estructura solicitada
    card.innerHTML = `
      <!-- contenedor de media -->
      <div class="card-media">
        <!-- contenedor de la imagen -->
        <div class="cover">
          <!-- imagen del producto; ?.[0] accede al primer elemento del array images de forma segura -->
          <img src="${product.images?.[0] || ""}" alt="${
      product.title || ""
    }" />
        </div>
      </div>
      <!-- título del producto -->
      <h3>${product.title}</h3>
      <!-- precio del producto -->
      <p>$${product.price}</p>
    `;

    // añade la tarjeta creada al contenedor productList
    productList.appendChild(card);
  });
}

loadProduct();

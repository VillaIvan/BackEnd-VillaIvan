class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const product = {
      id: this.#getMaxId() + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    const codeProducto = this.#getCode(code);
    if (!codeProducto) {
      this.products.push(product);
    } else {
      console.log("ERROR: Codigo Repetido");
    }
    // this.products.push(product);
  }

  getProduct() {
    console.log(this.products);
  }

  getProductById(idProducto) {
    const producto = this.#getProducto(idProducto);
    if (producto) {
      console.log(producto);
    } else {
      console.log("ERROR: Producto no existe");
    }
  }

  #getMaxId() {
    let maxId = 0;
    this.products.map((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  }

  #getCode(codeProducto) {
    return this.products.find((product) => product.code === codeProducto);
  }

  #getProducto(idProducto) {
    return this.products.find((product) => product.id === idProducto);
  }
}

const productManager = new ProductManager();

productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
productManager.getProduct();
productManager.addProduct(
  "producto prueba2",
  "Este es un producto prueba2",
  2200,
  "Sin imagen",
  "abc123",
  24
);
productManager.getProductById(1);
productManager.getProductById(5);

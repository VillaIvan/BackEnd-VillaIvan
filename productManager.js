import fs from "fs";
import path from "path";

const writeFile = async (path, contents) =>
  await fs.promises.writeFile(path, JSON.stringify(contents, null, 2));

const readFile = async (path) => {
  const data = await fs.promises.readFile(path, "utf8");
  return JSON.parse(data);
};

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    if (fs.existsSync(filePath)) {
      this.products = JSON.parse(fs.readFileSync(filePath));
    } else {
      this.products = [];
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
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
        await writeFile(this.path, this.products);
      } else {
        console.log("ERROR: Codigo Repetido");
      }

      fs.promises.writeFile("Products.json", JSON.stringify(this.products));
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getProduct() {
    try {
      return console.log(await readFile(this.path));
    } catch (error) {
      console.log("ERROR: linea 51", error);
    }
  }

  getProductById(idProducto) {
    const producto = this.#getProducto(idProducto);
    if (producto) {
      console.log(producto);
    } else {
      console.log("ERROR: Producto no existe");
    }
  }

  async updateProduct(product) {
    try {
      this.products = this.products.map((p) => {
        if (p.id === product.id) {
          return {
            ...p,
            ...product,
          };
        }
        return p;
      });
      await writeFile(this.path, this.products);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    this.products = this.products.filter((p) => p.id !== id);
    await writeFile(this.path, this.products);
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

const productManager = new ProductManager("Products.json");

// productManager.addProduct(
//   "producto prueba2",
//   "Este es un producto prueba",
//   200,
//   "Sin imagen",
//   "abcgj",
//   25
// );

productManager.updateProduct({
  title: "Producer",
  description: "lorem ipsum",
  price: 1000,
  thumbnail: "thumbnail",
  code: 8,
  stock: 45,
  id: 3,
});

console.log(productManager.getProduct());

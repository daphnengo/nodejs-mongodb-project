const { getDb } = require('../util/database');

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    // In MongoDB, we have Database, Collection and Document
    // "products" is a collection
    return db.collection('products')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(error => console.log(error));
  }

  static findAllProducts() {
    const db = getDb();

    return db.collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(error => console.log(error));
  }
}

module.exports = Product;

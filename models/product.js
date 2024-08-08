const mongodb = require('mongodb');
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

  static findProductById(productId) {
    const db = getDb();

    return db.collection('products')
      .find({ _id: mongodb.ObjectId.createFromHexString(productId) })
      .next()
      .then(product => {
        // {
        //   _id: new ObjectId('66b195c62603f85f666c3e8b'),
        //   title: 'Doraemon',
        //   price: '14.99',
        //   description: 'Gadget Cat From The Future',
        //   imageUrl: 'https://i.pinimg.com/564x/54/7a/7f/547a7f9693b6ab79efcd963d2d760fcf.jpg\n'
        // }
        console.log(product);
        return product;
      })
      .catch(error => console.log(error));
  }
}

module.exports = Product;

const mongodb = require('mongodb');
const { getDb } = require('../util/database');

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    // this._id: new ObjectId('66b195c62603f85f666c3e8b')
    this._id = id ? mongodb.ObjectId.createFromHexString(id) : null;
  }

  save() {
    const db = getDb();
    let dbOp;

    // In MongoDB, there are Database, Collection and Document
    // "products" is a collection
    if (this._id) {
      // Update the product
      dbOp = db.collection('products')
        .updateOne(
          { _id: this._id },
          { $set: this },
        );
    } else {
      // Create a new product
      dbOp = db.collection('products').insertOne(this);
    }

    return dbOp
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

  static deleteProductById(productId) {
    const db = getDb();

    return db.collection('products')
      .deleteOne({ _id: mongodb.ObjectId.createFromHexString(productId) })
      .catch(error => console.log(error));
  }
}

module.exports = Product;

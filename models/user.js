const mongodb = require('mongodb');
const { getDb } = require('../util/database');

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // { items: [] }
    this._id = id;
  }

  save() {
    const db = getDb();

    return db.collection('users')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(error => console.log(error));
  }

  addToCart(product) {
    const db = getDb();
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    const cartProductIndex = this.cart.items.findIndex(cartItem => {
      return cartItem.productId.toString() === product._id.toString();
    });

    if (cartProductIndex > 0 || cartProductIndex === 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: product._id,
        quantity: newQuantity,
      });
    }

    const updatedCart = { items: updatedCartItems };

    // this._id: new ObjectId('66b7fb2deb548930d1fffecb')
    return db.collection('users')
      .updateOne(
        { _id: this._id },
        { $set: { cart: updatedCart } }
      );
  }

  static findUserById(userId) {
    const db = getDb();

    return db.collection('users')
      .findOne({ _id: mongodb.ObjectId.createFromHexString(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(error => console.log(error));
  }
}

module.exports = User;

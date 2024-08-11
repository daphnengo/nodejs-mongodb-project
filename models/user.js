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
    let updatedCartItems = [];
    const cartItems = this.cart?.items;

    if (cartItems) {
      updatedCartItems = [...cartItems];

      const cartProductIndex = cartItems.findIndex(cartItem => {
        return cartItem.productId.toString() === product._id.toString();
      });

      if (cartProductIndex > 0 || cartProductIndex === 0) {
        newQuantity = cartItems[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
      } else {
        updatedCartItems.push({
          productId: product._id,
          quantity: newQuantity,
        });
      }
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

  getCart() {
    const db = getDb();
    const cartItems = this.cart?.items;

    // list of productId in the cart
    const productIds = cartItems.map(item => {
      return item.productId;
    });

    return db.collection('products')
      .find({ _id: { $in: productIds || [] } })
      .toArray()
      .then(products => {
        const productsInCart = products.map(product => {
          const cartItem = cartItems.find(item => {
            return item.productId.toString() === product._id.toString();
          });

          return {
            ...product,
            quantity: cartItem.quantity,
          };
        });

        return productsInCart;
      });
  }

  deleteItemFromCart(productId) {
    const db = getDb();
    // filter items in the cart which has productId is different with
    // the product user wants to delete
    const upgradedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString();
    });

    return db.collection('users')
      .updateOne(
        { _id: this._id },
        { $set: { cart: { items: upgradedCartItems } } }
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

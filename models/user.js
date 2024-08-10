const mongodb = require('mongodb');
const { getDb } = require('../util/database');

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
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

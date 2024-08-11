const mongodb = require('mongodb');
const { MongoClient } = mongodb;

let _db;

const mongoConnect = callback => {
  // enter name of the database "store" after mongodb.net/store
  MongoClient.connect('mongodb+srv://dnngo29:<password>@cluster0.jyvzzuu.mongodb.net/store?retryWrites=true')
    .then(client => {
      console.log('Connected!');
      // store access to the database
      _db = client.db();
      callback();
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

const getDb = () => {
  if (_db) {
    // return access to the database
    return _db;
  }

  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

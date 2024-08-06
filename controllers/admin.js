const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-edit-product.html', {
    pageTitle: 'Admin Add Product',
    path: '/admin/add-product',
    btnLabel: 'Add Product',
    pathParam: 'add-product',
    product: {},
    isEdit: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const {
    title, // getting from "name" attribute
    imageUrl,
    price,
    description,
  } = req.body;
  const product = new Product(title, price, description, imageUrl);

  product.save()
    .then(() => {
      console.log('Created Product');
      res.redirect('/admin/manage-products');
    })
    .catch(err => console.log(err));
};

exports.getManageProducts = (req, res, next) => {
  // ProductModel.findAll()
  req.user.getProducts()
    .then(allProducts => {
      res.render('admin/manage-products.html', {
        products: allProducts,
        pageTitle: 'Admin Manage Products',
        path: '/admin/manage-products',
      });
    })
    .catch(err => console.log(err));
};

// exports.getEditProduct = (req, res, next) => {
//   const productId = req.params.productId;

//   // ProductModel.findByPk(productId)
//   req.user.getProducts({ where: { id: productId }})
//     .then(products => {
//       const product = products[0];
//       if (!product) {
//         return res.redirect('/');
//       }
//       res.render('admin/add-edit-product.html', {
//         pageTitle: 'Admin Edit Product',
//         path: '/admin/edit-product',
//         btnLabel: 'Update Product',
//         pathParam: 'edit-product',
//         product,
//         isEdit: true,
//       });
//     })
//     .catch(err => console.log(err));
// };

exports.postEditProduct = (req, res, next) => {
  const {
    title,
    imageUrl,
    price,
    description,
    productId,
  } = req.body;

  ProductModel.findByPk(productId)
    .then(product => {
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;
      // update the database
      return product.save();
    })
    .then(() => {
      console.log('Updated product successfully!');
      res.redirect('/admin/manage-products');
    })
    .catch(error => console.log(error));
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  ProductModel.findByPk(productId)
    .then(product => {
      return product.destroy();
    })
    .then(() => {
      console.log('Deleted product successfully!');
      res.redirect('/admin/manage-products');
    })
    .catch(error => console.log(error));
};

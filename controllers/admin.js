const ProductModel = require('../models/product');

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
  const product = new ProductModel(title, price, description, imageUrl);

  product.save()
    .then(() => {
      console.log('Created Product');
      res.redirect('/admin/manage-products');
    })
    .catch(err => console.log(err));
};

exports.getManageProducts = (req, res, next) => {
  ProductModel.findAllProducts()
    .then(allProducts => {
      res.render('admin/manage-products.html', {
        products: allProducts,
        pageTitle: 'Admin Manage Products',
        path: '/admin/manage-products',
      });
    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  // productId: 66b195c62603f85f666c3e8b
  const productId = req.params.productId;

  ProductModel.findProductById(productId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/add-edit-product.html', {
        pageTitle: 'Admin Edit Product',
        path: '/admin/edit-product',
        btnLabel: 'Update Product',
        pathParam: 'edit-product',
        product,
        isEdit: true,
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const {
    title,
    imageUrl,
    price,
    description,
    productId, // productId: 66b195c62603f85f666c3e8b
  } = req.body;

  const product = new ProductModel(
    title,
    price,
    description,
    imageUrl,
    productId,
  );

  // update the database
  product.save()
    .then(() => {
      console.log('Updated product successfully!');
      res.redirect('/admin/manage-products');
    })
    .catch(error => console.log(error));
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  ProductModel.deleteProductById(productId)
    .then(() => {
      console.log('Deleted product successfully!');
      res.redirect('/admin/manage-products');
    })
    .catch(error => console.log(error));
};

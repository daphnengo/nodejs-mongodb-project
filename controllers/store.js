const ProductModel = require('../models/product');

exports.getProducts = (req, res, next) => {
  ProductModel.findAllProducts()
    .then(allProducts => {
      res.render('store/products.html', {
        products: allProducts,
        pageTitle: 'Products',
        path: '/products',
      });
    })
    .catch(error => console.log(error));
};

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productId;

  ProductModel.findProductById(productId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }

      res.render('store/product-details.html', {
        pageTitle: product.title,
        path: '/product-details',
        product,
      });
    })
    .catch(error => console.log(error));
};

exports.postAddToCart = (req, res, next) => {
  const productId = req.body.productId;

  ProductModel.findProductById(productId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result)
      res.redirect('/cart');
    });
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(products => {
      console.log('getCart products: ', products);
      res.render('store/cart.html', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
      });
    })
    .catch(error => console.log(error));
};

exports.postCartDeleteItem = (req, res, next) => {
  const productId = req.body.productId;

  req.user.deleteItemFromCart(productId)
    .then(() => res.redirect('/cart'))
    .catch(error => console.log(error));
};

// exports.postCreateOrder = (req, res, next) => {
//   let fetchedCart;

//   req.user.getCart()
//     .then(cart => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then(products => {
//       return req.user.createOrder()
//         .then(order => {
//           return order.addProducts(
//             products.map(product => {
//               product.orderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           );
//         })
//         .catch(error => console.log(error));
//     })
//     .then(() => fetchedCart.setProducts(null))
//     .then(() => res.redirect('/orders'))
//     .catch(error => console.log(error));
// };

// exports.getOrders = (req, res, next) => {
//   req.user.getOrders({ include: ['products'] })
//     .then(orders => {
//       console.log(orders);
//       res.render('store/orders.html', {
//         path: '/orders',
//         pageTitle: 'Orders',
//         orders: orders,
//       });
//     })
//     .catch(error => console.log(error));
// };


exports.getError404 = (req, res, next) => {
  res.status(404).render('errors.html', {
    pageTitle: 'Page Not Found',
    path: '/404',
  });
};

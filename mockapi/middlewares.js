// const products = [];

module.exports = (req, res, next) => {
  // console.log(req.body);
  // if (req.url.includes('addCart')) {
  //   res.jsonp(products[req.body.productId]);
  //   return;
  // }
  next();
};

module.exports = function (req, res, next) {
  req.method = 'GET';
  req.url = "/" + req.url.split("/").join("_").replace("_", "");
  req.originalUrl = "/" + req.originalUrl.split("/").join("_").replace("_", "");
  next()
};
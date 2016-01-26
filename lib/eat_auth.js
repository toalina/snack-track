var eat = require('eat');
var User = require(__dirname + '/../models/user');

module.exports = exports = function(req, res, next) {
  var token = req.headers.token;
  var bodyToken = (req.body)? req.body.token : '';
  token = token || bodyToken;
  if (!token) {
    console.log('no token');
    return res.status(401).json({msg: 'nope! not working no way dude'});
  }

  eat.decode(token, process.env.APP_SECRET, function(err, decoded) {
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'nope! bummer'});
    }

    User.findOne({_id: decoded.id}, function(err, user) {
      if (err) {
        console.log(err);
        return res.status(401).json({msg: 'nope nope nope'});
      }

      if (!user) {
        console.log(err);
        return res.status(401).json({msg: 'nooooooope!'});
      }

      req.user = user;
      next();
    });
  });
};

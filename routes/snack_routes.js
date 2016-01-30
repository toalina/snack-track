var express = require('express');
var bodyParser = require('body-parser');
var Snack = require(__dirname + '/../models/snack');
var handleError = require(__dirname + '/../lib/handleServerError');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var snackRouter = module.exports = exports = express.Router();

snackRouter.use(bodyParser.json());

snackRouter.get('/snacks', eatAuth, function(req, res) {
  Snack.find({snackerId: req.user._id}, function(err, data) {
    if(err) return handleError(err, res);

    res.json(data);
  });
});

snackRouter.get('/allsnacks', function(req, res) {
  Snack.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

snackRouter.post('/snacks', eatAuth, function(req, res) {
  var newSnack = new Snack(req.body);
  newSnack.snackerId = req.user._id;
  newSnack.snacker = req.user.username;
  debugger;
  newSnack.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

snackRouter.put('/snacks/:id', eatAuth, function(req, res) {
  var snackData = req.body;
  delete snackData._id;
  Snack.update({_id: req.params.id}, snackData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

snackRouter.delete('/snacks/:id', eatAuth, function(req, res) {
  Snack.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});










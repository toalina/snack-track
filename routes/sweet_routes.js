var express = require('express');
var bodyParser = require('body-parser');
var Sweet = require(__dirname + '/../models/sweet');
var handleError = require(__dirname + '/../lib/handleServerError');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var sweetRouter = module.exports = exports = express.Router();

sweetRouter.use(bodyParser.json());

sweetRouter.get('/sweets', eatAuth, function(req, res) {
  Sweet.find({sweettoothId: req.user._id}, function(err, data) {
    if(err) return handleError(err, res);

    res.json(data);
  });
});

sweetRouter.get('/allsweets', function(req, res) {
  Sweet.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

sweetRouter.post('/sweets', eatAuth, function(req, res) {
  var newSweet = new Sweet(req.body);
  newSweet.sweettoothId = req.user._id;
  newSweet.sweettooth = req.user.username;
  debugger;
  newSweet.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

sweetRouter.put('/sweets/:id', eatAuth, function(req, res) {
  var sweetData = req.body;
  delete sweetData._id;
  Sweet.update({_id: req.params.id}, sweetData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

sweetRouter.delete('/sweets/:id', eatAuth, function(req, res) {
  Sweet.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});










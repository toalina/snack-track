var mongoose = require('mongoose');

var snackSchema = new mongoose.Schema({
  name: String,
  type: String,
  calories: {type: Number, default: 5000},
  snackerId: String
});

module.exports = mongoose.model('Snack', snackSchema);

var mongoose = require('mongoose');

var sweetSchema = new mongoose.Schema({
  name: String,
  brand: String,
  caloriesPerServing: {type: Number, default: 200},
  numberOfServings: Number,
  sweettoothId: String
});

module.exports = mongoose.model('Sweet', sweetSchema);

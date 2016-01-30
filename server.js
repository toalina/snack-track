var mongoose = require('mongoose');
var express = require('express');
var app = express();
var snackRouter = require(__dirname + '/routes/snack_routes');
var authRouter = require(__dirname + '/routes/auth_routes');

process.env.APP_SECRET = process.env.APP_SECRET || 'changechangechangeme';

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/snack_track_dev');

app.use(express.static(__dirname + '/build'));

app.use('/api', authRouter);
app.use('/api', snackRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('snack server up on port 3000');
});

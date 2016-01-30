var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/snack_track_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Snack = require(__dirname + '/../models/snack');

describe('snack routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a snack', function(done) {
    var snackData = {name: 'test snack'};
    chai.request('localhost:3000')
      .post('/api/snacks')
      .send(snackData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test snack');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should be able to get all da snacks', function(done) {
    chai.request('localhost:3000')
      .get('/api/snacks')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('needs a snack', function() {
    beforeEach(function(done) {
      (new Snack({name: 'test snack'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.snack = data;
        done();
      }.bind(this));
    });

    it('should be able to modify a snack', function(done) {
      chai.request('localhost:3000')
        .put('/api/snacks/' + this.snack._id)
        .send({name: 'a different snack name'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });

    it('should be able to murder a snack', function(done) {
      chai.request('localhost:3000')
        .delete('/api/snacks/' + this.snack._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });
  });
});

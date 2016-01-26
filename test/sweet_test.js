var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/sweet_track_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Sweet = require(__dirname + '/../models/sweet');

describe('sweet routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a sweet', function(done) {
    var sweetData = {name: 'test sweet'};
    chai.request('localhost:3000')
      .post('/api/sweets')
      .send(sweetData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test sweet');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should be able to get all da sweets', function(done) {
    chai.request('localhost:3000')
      .get('/api/sweets')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('needs a sweet', function() {
    beforeEach(function(done) {
      (new Sweet({name: 'test sweet'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.sweet = data;
        done();
      }.bind(this));
    });

    it('should be able to modify a sweet', function(done) {
      chai.request('localhost:3000')
      .put('/api/sweets/' + this.sweet._id)
      .send({name: 'a different sweet name'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('success!');
        done();
      });
    });

    it('should be able to delete a sweet', function(done) {
      chai.request('localhost:3000')
      .delete('/api/sweets/' + this.sweet._id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('success!');
        done();
      });
    });
  });
});

'use strict';

let mongoose = require('../../../server/config/MongooseConfig');

describe('Customer', function() {
  let id;
  beforeEach(function(done) {
    let db = mongoose.connection.db;
    let _user = Object.assign({}, USER);
    db.dropDatabase(function() {
      db.collection('customers').insert([_user, { givenName: 'Sinead' }], function(err, data) {
        debug('data', data);

        id = data.ops[0]._id;

        done();
      });
    });
  });

  it('GET /api/customers should list all', function(done) {
    request
      .get('/api/customers')
      .end(function(err, response) {
        let data = response.body;

        debug('data', data);
        assert.equal(response.status, 200);
        assert.ok(Array.isArray(response.body.items));
        assert.equal(data.items[0].givenName, 'Jane');
        assert.equal(data.items.length, 2);
        done();
      });
  });

  it('GET /api/customers?q=jane should filter results', function(done) {
    request
      .get('/api/customers?q=jane')
      .end(function(err, response) {
        let data = response.body;
        assert.equal(response.status, 200);
        assert.ok(Array.isArray(response.body.items));
        assert.equal(data.items[0].givenName, 'Jane');
        assert.equal(data.items.length, 1);
        done();
      });
  });

  it('GET /api/customers/:id should return customer', function(done) {
    request
      .get(`/api/customers/${id}`)
      .end(function(err, response) {
        let data = response.body;
        assert.equal(data.givenName, 'Jane');
        assert.equal(data.familyName, 'Doe');
        assert.equal(response.status, 200);
        assert.ok(response.body);
        done();
      });
  });

  it('POST /api/customers should create', function(done) {
    request
      .post('/api/customers')
      .send(USER)
      .end(function(err, response) {
        debug('response', response.body);

        assert.equal(response.status, 201);
        assert.equal(response.body.givenName, USER.givenName);
        assert.equal(response.body.familyName, USER.familyName);
        assert.equal(response.body.email, USER.email);
        assert.ok(response.body._id);
        done();
      });
  });

});

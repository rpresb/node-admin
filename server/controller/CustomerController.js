'use strict';

let bluebird = require('bluebird');
let debug = require('debug')('delivery-admin:controller:customer');
let repository = require('../repository/CustomerRepository');
const PER_PAGE = 10;

let CustomerController = {
  list: function(request, response, next) {
    let query = {};
    let page = parseInt(request.query.page || 1, 10);

    if (request.query.q) {
      let search = new RegExp(request.query.q, 'i');
      query = {
        $or: [
          { givenName: search },
          { telephones: search },
          { email: search },
          { 'address.postalCode': search }
        ]
      };
    }
    debug('query', query);

    bluebird.all([
      repository.find(query).limit(PER_PAGE).skip(PER_PAGE * (page - 1)),
      repository.count(query)
    ])
    .then(function(results) {
      let result = results[0];
      let count = results[1];
      let data = {
        items: result,
        _metadata: {
          size: (result || []).length,
          total: count,
          perPage: PER_PAGE,
          page: page
        }
      };

      response.json(data);
    })
    .catch(next);
  },
  byId: function(request, response, next) {
    let _id = request.params._id;
    repository.findOne({ _id: _id })
    .then(function(result) {
      if (!result) {
        let err = new Error('customer not found');
        err.status = 404;
        throw err;
      }
      return result;
    })
    .then(function(result) {
      response.json(result);
    })
    .catch(next);
  },
  create: function(request, response, next) {
    let customer = new repository(request.body);
    customer.save()
      .then(function(result) {
        response.status(201).json(result);
      })
      .catch(function(err) {
        err.status = 422;
        next(err);
      });
  },
  update: function(request, response, next) {
    let _id = request.params._id;
    repository.update({ _id: _id }, { $set: request.body })
    .then(function(result) {
      response.json(result);
    })
    .catch(next);
  },
  remove: function(request, response, next) {
    let _id = request.params._id;
    repository.remove({ _id: _id })
    .then(function(err, result) {
      response.sendStatus(204);
    })
    .catch(next);
  }
};

module.exports = CustomerController;

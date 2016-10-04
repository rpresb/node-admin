'use strict';

let bluebird = require('bluebird');
let debug = require('debug')('delivery-admin:controller:order');
let repository = require('../repository/OrderRepository');

let OrderController = {
  list: function(request, response, next) {
    let query = {};

    if (request.query.q) {
      let search = new RegExp(request.query.q, 'i');
      query = {
        $or: [
          { name: search }
        ]
      };
    }
    debug('query', query);

    bluebird.all([
      repository.find(query),
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
          page: 1
        }
      };

      response.json(data);
    })
    .catch(next);
  },
  byId: function(request, response, next) {
    let _id = request.params._id;
    repository.findOne({ _id: _id }).exec(function(err, result) {
      if (err) {
        return next(err);
      }

      response.json(result);
    });
  },
  create: function(request, response, next) {
    let order = new repository(request.body);
    order.save()
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
    repository.update({ _id: _id }, { $set: request.body }).exec(function(err, result) {
      if (err) {
        return next(err);
      }
      response.json(result);
    });
  },
  remove: function(request, response, next) {
    let _id = request.params._id;
    repository.remove({ _id: _id }).exec(function(err, result) {
      if (err) {
        return next(err);
      }
      response.sendStatus(204);
    });
  }
};

module.exports = OrderController;

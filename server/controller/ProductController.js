'use strict';

let debug = require('debug')('delivery-admin:controller:product');
let repository = require('../repository/ProductRepository');

let ProductController = {
  list: function(request, response, next) {
    let query = {};
    let attr = request.query.attr;

    if (request.query.q) {
      let search = new RegExp(request.query.q, 'i');
      query = {
        $or: [
          { name: search }
        ]
      };
    }
    debug('query', query);

    repository.find(query).exec(function(err, result) {
      if (err) {
        return next(err);
      }
      let data = {
        items: result,
        _metadata: {
          size: (result || []).length,
          total: 500,
          page: 1
        }
      };
      if (attr === 'items') {
        data = data.items;
      }

      response.json(data);
    });
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
    let product = new repository(request.body);
    product.save()
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

module.exports = ProductController;

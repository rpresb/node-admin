'use strict';

let debug = require('debug')('delivery-admin:controller:postalcode');
let repository = require('../repositories/PostalCodeRepository');

let PostalCodeController = {
  findByPostalCode: function(request, response, next) {
    let postalCode = parseInt(request.params.postalCode, 10);

    debug('postalCode', postalCode, { postalCode });

    repository.findOne({ postalCode }).exec(function(err, result) {
      if (err) {
        return next(err);
      }

      response.json(result);
    });
  }
};

module.exports = PostalCodeController;

(function() {
  'use strict';

  angular
    .module('app.orders')
    .factory('OrderService', OrderService);

  /*@ngInject*/
  function OrderService(HTTPService) {
    var service = {
      save: function(_data) {
        var data = angular.copy(_data);

        data.items = _filterProductsWithQuantity(data.items);
        data.gifts = _filterProductsWithQuantity(data.gifts);

        var promise;
        if (data._id) {
          promise = HTTPService.put('/api/orders/' + data._id, data)
        } else {
          promise = HTTPService.post('/api/orders', data);
        }

        return promise
          .then(HTTPService.handleError);
      }
    };

    return service;
  };

})();

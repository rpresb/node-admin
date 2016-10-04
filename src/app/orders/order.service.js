(function() {
  'use strict';

  angular
    .module('app.orders')
    .factory('OrderService', OrderService);

  /*@ngInject*/
  function OrderService(HTTPService) {
    var DELIVERY_TIME = 50 * 60 * 1000;

    var service = {
      getDeliveryTime: function() {
        var now = new Date().getTime();
        return {
          date: new Date(now + DELIVERY_TIME),
          price: 5
        };
      },

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

    function _filterProductsWithQuantity(items) {
      return (items || []).filter(function(item) {
        return item.quantity;
      });
    }

    return service;
  };

})();

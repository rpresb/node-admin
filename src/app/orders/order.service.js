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

      save: function(order, customer) {
        var data = angular.copy(order);

        if (customer) {
          data.customer = customer;
          data.shippingAddress = customer.address;
        }

        data.items = _filterProductsWithQuantity(data.items);
        data.gifts = _filterProductsWithQuantity(data.gifts);

        if (data.payment && data.payment.paymentType !== 'MONEY') {
          data.payment.change = null;
          data.payment.moneyTotal = null;
        }

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

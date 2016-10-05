(function() {
  'use strict';

  angular
    .module('app.orders')
    .controller('OrderController', OrderController);


  /*@ngInject*/
  function OrderController($state, RestService, ProductService, NotificationService, CustomerService, OrderService) {
    var vm = this;
    var id = $state.params.id;

    RestService.endpoint = 'orders';

    vm.order = {};
    vm.saveOrder = saveOrder;
    vm.autocompleteCustomer = autocompleteCustomer;

    if (id) {
      _byId(id);
    } else {
      vm.order.delivery = OrderService.getDeliveryTime();
    }
    _fetchProducts();


    vm.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1,
      showWeeks: false
    };

    function saveOrder(order) {
      OrderService.save(order)
        .then(function(response) {
          var data = response.data;

          if (response.status === 201) {
            $state.go($state.current.name, { id: data._id });
          }

          NotificationService.success({ title: 'order', message: 'form.saved' });
        })
        .catch(NotificationService.error);
    }

    function autocompleteCustomer(search) {
      CustomerService.search({ q: search });
    }

    /**
     * private
     */
    function _byId(id) {
      RestService.byId(id)
        .then(function(response) {
          vm.order = response.data;

          if (vm.order.delivery && vm.order.delivery.date) {
            vm.order.delivery.date = new Date(vm.order.delivery.date);
          }
        })
        .catch(NotificationService.error);
    }
    function _fetchProducts() {
      return ProductService.list({ attr: 'items' })
        .then(function(response) {
          var data = response.data;
          vm.order.items = data;
          vm.order.gifts = angular.copy(data);
        })
        .catch(NotificationService.error)
    }

    return vm;
  }

})();

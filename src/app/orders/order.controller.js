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

    vm.data = {};
    vm.save = save;
    vm.autocompleteCustomer = autocompleteCustomer;

    if (id) {
      _byId(id);
    } else {
      vm.data.delivery = OrderService.getDeliveryTime();
    }
    _fetchProducts();


    vm.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1,
      showWeeks: false
    };


    function save(data) {
      OrderService.save(data)
        .then(function(response) {
          var data = response.data;

          if (response.status === 201) {
            $state.go($state.current.name, { id: data._id });
          }

          NotificationService.success({ title: 'Pedido', message: 'Salvo com sucesso' });
        })
        .catch(NotificationService.err);
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
          vm.data = response.data;

          if (vm.data.delivery && vm.data.delivery.date) {
            vm.data.delivery.date = new Date(vm.data.delivery.date);
          }
        })
        .catch(NotificationService.err);
    }
    function _fetchProducts() {
      return ProductService.list({ attr: 'items' })
        .then(function(response) {
          var data = response.data;
          vm.data.items = data;
          vm.data.gifts = angular.copy(data);
        })
        .catch(NotificationService.err)
    }

    return vm;
  }

})();

(function() {
  'use strict';

  angular
    .module('app.orders')
    .controller('OrderController', OrderController);


  /*@ngInject*/
  function OrderController($state, RestService, ProductService, NotificationService) {
    var vm = this;
    var id = $state.params.id;

    RestService.endpoint = 'orders';

    vm.data = {};
    vm.save = save;

    if (id) {
      _byId(id);
    }
    _fetchProducts();


    function save(_data) {
      var data = angular.copy(_data);

      data.items = _filterProductsWithQuantity(data.items)
      console.log('data', data)
      return false;

      RestService.save(data)
        .then(function(response) {
          var data = response.data;

          if (response.status === 201) {
            $state.go($state.current.name, { id: data._id });
          }

          NotificationService.success({ title: 'Pedido', message: 'Salvo com sucesso' });
        })
        .catch(NotificationService.err);
    }

    /**
     * private
     */
    function _byId(id) {
      RestService.byId(id)
        .then(function(response) {
          vm.data = response.data;
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
    function _filterProductsWithQuantity(items) {
      return (items || []).filter(function(item) {
        return item.quantity;
      });
    }

    return vm;
  }

})();

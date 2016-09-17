(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('CustomerListController', CustomerListController);


  /*@ngInject*/
  function CustomerListController($state, CustomerService) {
    var vm = this;
    vm.q = $state.params.q;

    vm.open = open;
    vm.searchCustomer = searchCustomer;

    vm.currentPage = 1;

    _list({ q: vm.q });

    function open(id) {
      $state.go('app.customer', { id: id });
    }
    function searchCustomer(q) {
      $state.go($state.current.name, { q: q });
    }

    /**
     * private
     */

    function _list(query) {
      CustomerService.list(query)
        .then(function(response) {
          vm.data = response.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    return vm;
  }

})();

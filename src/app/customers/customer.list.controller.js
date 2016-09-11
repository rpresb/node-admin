(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('CustomerListController', CustomerListController);


  /*@ngInject*/
  function CustomerListController($state, CustomerService) {
    var vm = this;
    var q = $state.params.q;
    vm.q = q;

    vm.goTo = goTo;
    vm.open = open;
    vm.searchCustomer = searchCustomer;

    _list({ q: q });

    function goTo(stateName) {
      $state.go(stateName);
      vm.data = {};
    }
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
          vm.data = response.data.items;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    return vm;
  }

})();

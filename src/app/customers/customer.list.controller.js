(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('CustomerListController', CustomerListController);


  /*@ngInject*/
  function CustomerListController($state, $controller, CustomerService) {
    var vm = this;

    angular.extend(vm, $controller('GenericListController', {
        vm: vm, $state: $state, service: CustomerService, module: 'customer'
      })
    );

    return vm;
  }

})();

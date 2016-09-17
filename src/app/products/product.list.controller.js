(function() {
  'use strict';

  angular
    .module('app.products')
    .controller('ProductListController', ProductListController);


  /*@ngInject*/
  function ProductListController($state, $controller, ProductService) {
    var vm = this;

    angular.extend(vm, $controller('GenericListController', {
        vm: vm, $state: $state, service: ProductService, module: 'product'
      })
    );

    return vm;
  }

})();

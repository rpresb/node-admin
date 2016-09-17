(function() {
  'use strict';

  angular
    .module('app.products')
    .config(config);


  /*@ngInject*/
  function config ($stateProvider) {
    $stateProvider
    .state('app.products', {
      url: '/products?q?',
      controller: 'ProductListController',
      controllerAs: 'vm',
      templateUrl: '/products/list.html',
      data : {
        title: 'Lista de Clientes'
      }
    })
    .state('app.product', {
      url: '/product/:id?',
      controller: 'ProductController',
      controllerAs: 'vm',
      templateUrl: '/products/form.html',
      data : {
        title: 'Cadastro de Cliente'
      }
    });
  }
}());

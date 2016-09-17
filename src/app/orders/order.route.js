(function() {
  'use strict';

  angular
    .module('app.orders')
    .config(config);


  /*@ngInject*/
  function config ($stateProvider) {
    $stateProvider
    .state('app.orders', {
      url: '/orders?q?',
      controller: 'OrderListController',
      controllerAs: 'vm',
      templateUrl: '/orders/list.html',
      data : {
        title: 'Lista de Pedidos'
      }
    })
    .state('app.order', {
      url: '/order/:id?',
      controller: 'OrderController',
      controllerAs: 'vm',
      templateUrl: '/orders/form.html',
      data : {
        title: 'Cadastro de Pedido'
      }
    });
  }
}());

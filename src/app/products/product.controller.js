(function() {
  'use strict';

  angular
    .module('app.products')
    .controller('ProductController', ProductController);


  /*@ngInject*/
  function ProductController($state, ProductService, NotificationService) {
    var vm = this;
    var id = $state.params.id;

    vm.data = {};
    vm.save = save;

    if (id) {
      _byId(id)
    }

    function save(data) {
      ProductService.save(data)
        .then(function(response) {
          var data = response.data;

          if (response.status === 201) {
            $state.go($state.current.name, { id: data._id });
          }

          NotificationService.success({ title: 'Produto', message: 'Salvo com sucesso' });
        })
        .catch(NotificationService.err);
    }

    /**
     * private
     */
    function _byId(id) {
      ProductService.byId(id)
        .then(function(response) {
          vm.data = response.data;
        })
        .catch(NotificationService.err);
    }

    return vm;
  }

})();

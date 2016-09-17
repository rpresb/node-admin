(function() {
  'use strict';

  angular
    .module('app.generic')
    .controller('GenericListController', GenericListController);


  /*@ngInject*/
  function GenericListController($state, vm, service, module, NotificationService) {
    vm.q = $state.params.q;
    vm.open = open;
    vm.searchAction = searchAction;

    _init({ q: vm.q });

    function open(id) {
      $state.go('app.' + module, { id: id });
    }
    function searchAction(q) {
      $state.go($state.current.name, { q: q });
    }

    /**
     * private
     */
    function _init(query) {
      service.list(query)
        .then(function(response) {
          vm.data = response.data;
        })
        .catch(NotificationService.err);
    }

    return vm;
  }

})();

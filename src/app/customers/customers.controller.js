(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('CustomerController', CustomerController);


  /*@ngInject*/
  function CustomerController($state, CustomerService) {
    var vm = this;
    var id = $state.params.id;

    vm.data = {
      address: { addressRegion: 'SP' }
    };
    vm.save = save;

    if (id) {
      _byId(id)
    }

    function save(data) {
      CustomerService.save(data)
        .then(function(response) {
          var data = response.data;

          console.log(data);

          if (response.status === 201) {
            $state.go($state.current.name, { id: data._id });
          }
        })
        .catch(function(err) {
          console.log(err);
        })
    }

    /**
     * private
     */
    function _byId(id) {
      CustomerService.byId(id)
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

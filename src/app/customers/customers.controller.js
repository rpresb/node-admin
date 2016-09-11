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

    CustomerService.byId(id)
      .then(function(response) {
        vm.data = response.data;
      })
      .catch(function(err) {
        console.log(err);
      });


    function save(data) {
      CustomerService.save(data)
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(err) {
          console.log(err);
        })
    }

    return vm;
  }

})();

(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('CustomerController', CustomerController);


  /*@ngInject*/
  function CustomerController($state, CustomerService, PostalCodeService) {
    var vm = this;
    var id = $state.params.id;

    vm.data = {
      address: { addressRegion: 'SP' }
    };
    vm.save = save;
    vm.findByPostalCode = findByPostalCode;

    if (id) {
      _byId(id)
    }

    function save(data) {
      CustomerService.save(data)
        .then(function(response) {
          var data = response.data;

          if (response.status === 201) {
            $state.go($state.current.name, { id: data._id });
          }
        })
        .catch(function(err) {
          console.log(err);
        })
    }

    function findByPostalCode(postalCode) {
      if (!postalCode || postalCode.length < 8) {
        return false;
      }
      PostalCodeService.findByPostalCode(postalCode)
        .then(function(response) {
          var data = response.data;

          vm.data.address = data;
          vm.data.address.postalCode = postalCode;
          vm.disableAddressFields = !!data.streetAddress;
        })
        .catch(function() {
          vm.disableAddressFields = false;
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

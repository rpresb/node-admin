(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('CustomerController', CustomerController);


  /*@ngInject*/
  function CustomerController($state, RestService, PostalCodeService, NotificationService) {
    var vm = this;
    var id = $state.params.id;

    RestService.endpoint = 'customers';

    vm.data = {
      address: { addressRegion: 'SP' }
    };
    vm.save = save;
    vm.findByPostalCode = findByPostalCode;

    vm.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(),
      minDate: new Date(1900, 0, 1),
      startingDay: 1,
      showWeeks: false
    };

    if (id) {
      _byId(id)
    }

    function save(data) {
      RestService.save(data)
        .then(function(response) {
          var data = response.data;

          if (response.status === 201) {
            $state.go($state.current.name, { id: data._id });
          }

          NotificationService.success({ title: 'Cliente', message: 'Salvo com sucesso' });
        })
        .catch(NotificationService.err);
    }

    function findByPostalCode(postalCode) {
      if (!postalCode || postalCode.length < 8) {
        vm.disableAddressFields = false;
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
      RestService.byId(id)
        .then(function(response) {
          vm.data = response.data;
          vm.data.birthDate = vm.data.birthDate ? new Date(vm.data.birthDate) : '';
          vm.disableAddressFields = !!(vm.data.address && vm.data.address.streetAddress);
        })
        .catch(NotificationService.err);
    }

    return vm;
  }

})();

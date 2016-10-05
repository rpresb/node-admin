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

    vm.customer = {
      address: { addressRegion: 'SP' }
    };
    vm.saveCustomer = saveCustomer;
    vm.findByPostalCode = findByPostalCode;
    vm.findReferencePoint = findReferencePoint;

    vm.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(),
      minDate: new Date(1900, 0, 1),
      startingDay: 1,
      showWeeks: false
    };

    if (id) {
      _byId(id);
    }

    function saveCustomer(data) {
      RestService.save(data)
        .then(function(response) {
          var data = response.data;

          if (response.status === 201) {
            $state.go($state.current.name, { id: data._id });
          }

          NotificationService.success({ title: 'customer', message: 'form.saved' });
        })
        .catch(NotificationService.error);
    }

    function findReferencePoint(postalCode, number) {
      if (!postalCode || postalCode.length < 8 || !number) {
        return false;
      }
      PostalCodeService.findReferencePoint(postalCode, number)
        .then(function(response) {
          var data = response.data;
          vm.customer.address = vm.customer.address || {};
          vm.customer.address.referencePoint = data.referencePoint;
        })
    }

    function findByPostalCode(postalCode) {
      if (!postalCode || postalCode.length < 8) {
        vm.disableAddressFields = false;
        return false;
      }
      PostalCodeService.findByPostalCode(postalCode)
        .then(function(response) {
          var data = response.data;

          vm.customer.address = data;
          vm.customer.address.postalCode = postalCode;
          vm.disableAddressFields = !!data.streetAddress;
        })
        .catch(function() {
          vm.disableAddressFields = false;
        });
    }
    /**
     * private
     */
    function _byId(id) {
      RestService.byId(id)
        .then(function(response) {
          vm.customer = response.data;
          vm.customer.birthDate = vm.customer.birthDate ? new Date(vm.customer.birthDate) : '';
          vm.disableAddressFields = !!(vm.customer.address && vm.customer.address.streetAddress);
        })
        .catch(NotificationService.error);
    }

    return vm;
  }

})();

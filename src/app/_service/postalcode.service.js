(function() {
  'use strict';

  angular
  .module('app')
  .factory('PostalCodeService', PostalCodeService);

  /*@ngInject*/
  function PostalCodeService(HTTPService) {
    var service = {
      findByPostalCode: function(postalCode) {
        return HTTPService.get('/api/postalcodes/' + postalCode, {}, { cache: true });
      }
    };

    return service;
  };

})();

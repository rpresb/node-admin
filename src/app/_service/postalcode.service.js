(function() {
  'use strict';

  angular
  .module('app')
  .factory('PostalCodeService', PostalCodeService);

  /*@ngInject*/
  function PostalCodeService(HTTPService) {
    var service = {
      findReferencePoint: function(postalCode, number) {
        var params = {
          postalCode: postalCode,
          number: number
        };
        return HTTPService.get('/api/postalcodes/referencePoint', params, { cache: true });
      },
      findByPostalCode: function(postalCode) {
        return HTTPService.get('/api/postalcodes/' + postalCode, {}, { cache: true });
      }
    };

    return service;
  };

})();

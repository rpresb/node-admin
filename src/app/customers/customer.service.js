(function() {
  'use strict';

  angular
  .module('app.customers')
  .factory('CustomerService', CustomerService);

  /*@ngInject*/
  function CustomerService(HTTPService) {
    var service = {
      search: function(params) {
        return HTTPService
          .get('/api/customers', params)
          .then(HTTPService.handleError);
      }
    };

    return service;
  };

})();

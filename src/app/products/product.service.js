(function() {
  'use strict';

  angular
    .module('app.products')
    .factory('ProductService', ProductService);

  /*@ngInject*/
  function ProductService(HTTPService) {
    var service = {
      list: function(params) {
        return HTTPService
          .get('/api/products', params)
          .then(HTTPService.handleError);
      },
      byId: function(id) {
        return HTTPService
          .get('/api/products/' + id)
          .then(HTTPService.handleError);
      },
      save: function(data) {
        var promise;
        if (data._id) {
          promise = HTTPService.put('/api/products/' + data._id, data)
        } else {
          promise = HTTPService.post('/api/products', data);
        }

        return promise
          .then(HTTPService.handleError);
      },
      remove: function(id) {
        return HTTPService
          .remove('/api/products/' + id)
          .then(HTTPService.handleError);
      }
    };

    return service;
  };

})();

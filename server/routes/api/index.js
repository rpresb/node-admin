'use strict';

let router = require('express').Router();

router.get('/', function(request, response, next) {
  response.send('PONG');
})
router.use('/customers', require('./customers'));
router.use('/postalcodes', require('./postalcodes'));

module.exports = router;

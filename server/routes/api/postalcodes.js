'use strict';

let router              = require('express').Router(),
    PostalCodeController  = require('../../controllers/PostalCodeController');


router.get('/:postalCode', PostalCodeController.findByPostalCode);

module.exports = router;

'use strict';

let router              = require('express').Router(),
    PostalCodeController  = require('../../controller/PostalCodeController');


router.get('/:postalCode', PostalCodeController.findByPostalCode);

module.exports = router;

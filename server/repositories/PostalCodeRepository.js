'use strict';

let mongoose            = require('../configs/MongooseConfig'),
    schema              = require('../schemas/PostalCodeSchema');

let PostalCodeRepository  = mongoose.model('PostalCodes', schema);

module.exports = PostalCodeRepository;

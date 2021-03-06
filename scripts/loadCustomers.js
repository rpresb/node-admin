'use strict';

let fs = require('fs'),
    debug = require('debug')('delivery-admin:script:load:customers');

let file = './scripts/julho.csv';

fs.readFile(file, {encoding: 'utf-8'}, function(err, data) {
  if (err) {
    return process.exit(1);
  }

  data = data.toString('utf-8');

  debug('data', data);
});

function customerMapper(line) {
  line = '7-May,Sáb.,Érika,"Rua Albertina Vieira das Silva Gordo, 212/ 32 bl 2",Vila Aurora,,,2,130,25,0,,,,,1,70,,,1,85,,,,,,,,,,,,,,,,,,,,,,,Cartão de Débito,9-May,Carlos,3.11,Folhadinho,Maio';
  let data = line.split(',');
  let order = {
    items: [{
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number }
    }],
    gifts: [{
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number }
    }],
    delivery: {
      price: '',
      courier: '',
      date: ''
    },
    payment: {
      discount: { type: Number },
      total: { type: Number },
      paymentType: { type: String }
    },
    shippingAddress: {
      streetAddress: { type: String },
      number: { type: Number },
      district: { type: String },
      complement: { type: String },
      referencePoint: { type: String },
      addressLocality: { type: String },
      addressRegin: { type: String },
      postalCode: { type: String, maxlength: 8 }
    }
  }
}

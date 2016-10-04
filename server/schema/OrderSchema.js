'use strict';

let mongoose = require('../config/MongooseConfig');


let OrderSchema = mongoose.Schema({
  customer: {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    givenName: { type: String }
  },
  createdAt: { type: Date, default: Date.now },
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
    price: { type: Number },
    courier: { type: String },
    date: { type: Date }
  },
  payment: {
    discount: { type: Number },
    total: { type: Number },
    paymentType: { type: String }
  },
  origin: {
    _externalId: { type: String },
    name: { type: String }
  },
  shippingAddress: {
    streetAddress: { type: String },
    number: { type: Number },
    district: { type: String },
    complement: { type: String },
    referencePoint: { type: String },
    addressLocality: { type: String },
    addressRegin: { type: String },
    postalCode: { type: String, maxlength: 9 }
  }
});


module.exports = OrderSchema;

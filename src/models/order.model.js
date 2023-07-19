const mongoose = require('mongoose');
const OrderStatus = require('../constant/order_status');

const geoLocationSchema = new mongoose.Schema({
    lat: {type: String, required: true},
    lng: {type: String, required: true},
});


const orderItemSchema = new mongoose.Schema({
    food: {type: String, required: true},
    price: {type: String, required: true},
    quantity: {type: Number, required: true},
});


const orderSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    geoLocation: {type: String, required: true},
    geoLocation: {type: geoLocationSchema, required: true},
    paymentId: {type: String},
    totalPrice: {type: Number, required: true},
    items: {type: [orderItemSchema], required: true},
    status: {type: String, default: OrderStatus.NEW},
    user: {type: mongoose.Schema.Types.ObjectId, required: true}
},{
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
  

const GeoLocationModel = mongoose.model('geoLocation', geoLocationSchema);
const OredrModel = mongoose.model('order', orderSchema);

module.exports = {
    GeoLocationModel,
    OredrModel
};

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../Models/UserModel");

let orderSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  restaurant: { type: String, required: true },
  restaurantID: { type: Number, required: true },
  items: {
    type: Map,
    of: { name: String, quantity: Number, price: Number }
  },
  subtotal: Number,
  tax: Number,
  delivery_fee: Number,
  total: Number
});

module.exports = mongoose.model("orders", orderSchema);
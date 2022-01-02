const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  orderHistory: [{ type: Schema.Types.ObjectId, ref: "orders" }],
  privacy: { type: Boolean, default: false }
});

userSchema.statics.findUser = function(name, callback) {
  this.find().where("username").equals(name).findOne(function(err, user) {
    if (err) return console.log("Error searching for user");
    callback(user);
  });
}

module.exports = mongoose.model("users", userSchema);
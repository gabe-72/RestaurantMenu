const express = require("express");
const User = require("../Models/UserModel");
const Order = require("../Models/OrderModel");

let router = express.Router();

// set up the routes
router.get("/:orderID", authOrder, sendOrderInfo);
router.post("/", express.json(), saveOrder);

// get the order document based on the parameter
router.param("orderID", function(req, res, next, id) {
  Order.findById(id, function(err, result) {
    if (err)
      return res.status(404).send("Order ID " + id + " does not exist.");
    console.log(typeof result);

    // populate the user with its username and privacy
    result.populate("user", "username privacy", function(err, result) {
      if (err)
        return res.status(500).send("Failed to load order");
      req.order = result; //save the result
      next();
    });
  });
});

/**
 * Checks and authenticates if the user can view the order
 */
function authOrder(req, res, next) {
  if (!req.order.user.privacy || (req.session.loggedin && req.order.user._id.equals(req.session.userid)))
    next();
  else
    res.sendStatus(401);
}

/**
 * Sends the order details page
 */
function sendOrderInfo(req, res) {
  res.render("pages/order", { order: req.order, user: req.session });
}

function saveOrder(req, res) {
  req.body.user = req.session.userid; // set the id of the user
  let newOrder = new Order(req.body);

  // save the order
  newOrder.save(function(err, result) {
    if (err) return res.status(500).send("Error saving order");

    // update the order history for the user
    User.findByIdAndUpdate(req.session.userid,
      { $push: { "orderHistory": result._id } },
      function(err, result) {
        if (err) return res.status(500).send("Error saving order");
        res.sendStatus(201);
      }
    );
  });
}

module.exports = router;
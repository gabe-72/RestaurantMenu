const express = require("express");
const User = require("../Models/UserModel");

let router = express.Router();

// set up the routes
router.get("/", queryParser, loadUsers, sendUsers);
router.get("/:userID", authUser, sendSingleUser);

router.put("/:userID", express.json(), updateUser);

router.param("userID", function(req, res, next, id) {
	User.findById(id, function(err, result){
    if (err || !result)
      return res.status(404).send("User ID " + id + " does not exist.");
      
    req.user = result;
    next();
  });
});

/**
 * Parse the query for name
 */
function queryParser(req, res, next) {
  if (!req.query.name)
    req.query.name = "";
  next();
}

/**
 * Loads the user based on the query
 */
function loadUsers(req, res, next) {
  let re = new RegExp(req.query.name, "i"); // RegEx for name
  User.find({ // query the database
    "username": { "$regex": re },
    "privacy": false
  }, "_id username", function(err, users) { // get only the id and username
    if (err) {
      res.sendStatus(500);
      return;
    }
    req.users = users;
    next();
  });
}

/**
 * Sends a page with a list of users
 */
function sendUsers(req, res) {
  res.render("pages/users", { users: req.users, user: req.session });
}

/**
 * Authenticates the user for viewing the desired user page
 */
function authUser(req, res, next) {
  if (!req.user.privacy || (req.session.loggedin && req.user._id.equals(req.session.userid))) {
    next();
  } else
    res.sendStatus(401);
}

/**
 * Sends either an html page or a json about a single user
 */
function sendSingleUser(req, res) {
  res.format({
    "text/html": () => { res.render("pages/user", { user: req.session, u: req.user }) },
    "application/json": () => { res.json(req.user) }
  });
}

/**
 * Updates the user in the database
 */
function updateUser(req, res) {
  User.findByIdAndUpdate(req.body._id, req.body, function(err, result) {
    if (err) return res.status(500).send("Error updating user");
    res.sendStatus(200);
  });
}

module.exports = router;
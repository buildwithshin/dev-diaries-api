//[SECTION] Dependencies and Modules
const express = require('express');
const userController = require('../controllers/user');

const { verify, isLoggedIn} = require("../auth");

// [ACTIVITY] Middleware
const { verifyAdmin } = require("../auth");


//[SECTION] Routing Component
const router = express.Router();

//[SECTION] Checking if the email already exists
router.post("/check-email", userController.checkEmailExists);

//[SECTION] Route for User Registration
router.post("/register", userController.registerUser);

//[SECTION] Route for User Login
router.post("/login", userController.loginUser);


module.exports = router;
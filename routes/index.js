const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController");

/* GET home page. */
router.get("/", messageController.message_list_get);

// sign up form
router.get("/sign-up", userController.user_create_get);

router.post("/sign-up", userController.user_create_post);

// login form
router.get("/login", userController.user_login_get);

router.post("/login", userController.user_login_post);

// logout function
router.get("/logout", userController.user_logout_get);

// join club form
router.get("/join-club", userController.user_joinClub_get);

router.post("/join-club", userController.user_joinClub_post);

// user profile
router.get("/profile", userController.user_profile_get);

// message submission
router.post("/submit-message", messageController.message_submission_post);

module.exports = router;

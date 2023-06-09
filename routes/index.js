const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { user: req.user });
});

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

module.exports = router;

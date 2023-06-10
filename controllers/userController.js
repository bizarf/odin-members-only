const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// sign up form GET
exports.user_create_get = asyncHandler(async (req, res, next) => {
    res.render("signUpForm", { title: "Sign-up" });
});

// sign up form POST
exports.user_create_post = [
    // clean the form data first
    body("firstname", "You must enter a first name").trim().escape().notEmpty(),
    body("lastname", "You must enter a last name").trim().escape().notEmpty(),
    body("username")
        .trim()
        .escape()
        .custom(async (value, { req, res }) => {
            const userExists = await User.findOne({
                username: value,
            }).exec();

            if (userExists) {
                throw new Error("User already exists");
            }
        }),
    body("password")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("You must enter a password")
        .isLength({ min: 8 })
        .withMessage("Your password must be at least 8 characters long"),
    body("confirmPassword")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("You must confirm the password")
        .isLength({ min: 8 })
        .withMessage("Your password must be at least 8 characters long")
        .custom(async (value, { req, res }) => {
            // wait for the password field or else there is no value to compare
            await req.body.password;
            if (req.body.password != value) {
                throw new Error("The passwords don't match");
            }
        }),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        // hash the password using bcrypt
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err) {
                throw new Error(err);
            } else {
                // hashedPassword instead of req.body.password as we want to save the hashed password to the database
                const user = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    password: hashedPassword,
                });

                if (!errors.isEmpty()) {
                    res.render("signUpForm", {
                        title: "Sign-up",
                        user: user,
                        errors: errors.array(),
                    });
                    return;
                } else {
                    await user.save();
                    res.redirect("/");
                }
            }
        });
    }),
];

// login form GET
exports.user_login_get = asyncHandler(async (req, res, next) => {
    res.render("loginForm", { title: "Login" });
});

// login form POST
exports.user_login_post = [
    body("username").trim().escape(),
    body("password")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("The password must not be empty")
        .custom(async (value, { req, res }) => {
            // validate password here, so that we can throw an error to the errors array if it doesn't match
            const user = await User.findOne({
                username: req.body.username,
            }).exec();
            const check = await bcrypt.compare(value, user.password);
            if (!check) {
                throw new Error("Incorrect password");
            }
        }),

    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("loginForm", {
                title: "Login",
                username: req.body.username,
                errors: errors.array(),
            });
            return;
        }
        // req, res at the end or else passport authenticate will hang
        passport.authenticate("local", {
            successRedirect: "/",
        })(req, res);
    },
];

// logout function
exports.user_logout_get = asyncHandler(async (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

// join club form GET
exports.user_joinClub_get = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.membershipStatus === false) {
        res.render("joinClub");
    } else {
        res.redirect("/");
    }
});

// join club form POST
exports.user_joinClub_post = [
    // clean input first and validate as well
    body("code")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("You must enter a code")
        .custom(async (value, { req, res }) => {
            await value;
            if (value != 13572468) {
                throw new Error("Wrong code!");
            }
        }),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("joinClub", {
                errors: errors.array(),
            });
            return;
        } else {
            // find by the username and then set the membershipStatus to true
            await User.findOneAndUpdate(
                { username: req.user.username },
                { $set: { membershipStatus: true } }
            );
            res.redirect("/");
        }
    }),
];

// user profile
exports.user_profile_get = asyncHandler(async (req, res, next) => {
    if (req.user) {
        res.render("userProfile", { user: req.user });
    } else {
        res.redirect("/");
    }
});

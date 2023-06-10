const User = require("../models/user");
const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// index page
exports.message_list_get = asyncHandler(async (req, res, next) => {
    const messages = await Message.find().populate("user").exec();

    res.render("index", { user: req.user, messages: messages });
});

// message submission post function
exports.message_submission_post = [
    body("newMessageText")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please type in a message."),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const message = new Message({
            user: req.user._id,
            title: req.body.newMessageTitle,
            text: req.body.newMessageText,
            timestamp: new Date(),
        });

        if (!errors.isEmpty()) {
            res.render("index", {
                user: req.user,
                errors: errors.array(),
            });
            return;
        } else {
            await message.save();
            res.redirect("/");
        }
    }),
];

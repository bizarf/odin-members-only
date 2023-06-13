const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: { type: String, required: true, maxLength: 50 },
    lastname: { type: String, required: true, maxLength: 50 },
    username: { type: String, required: true, minLength: 5, maxLength: 15 },
    password: { type: String, required: true, minLength: 8 },
    membershipStatus: { type: Boolean, default: false },
    adminStatus: { type: Boolean, default: false },
});

UserSchema.virtual("fullname").get(function () {
    return this.firstname + " " + this.lastname;
});

module.exports = mongoose.model("User", UserSchema);

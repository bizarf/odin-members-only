const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, maxLength: 50 },
    text: { type: String, required: true, maxLength: 280 },
    timestamp: { type: Date },
});

MessageSchema.virtual("timestamp_converted").get(function () {
    return DateTime.fromJSDate(timestamp).toLocaleString(
        DateTime.DATETIME_MED_WITH_SECONDS
    );
});

module.exports = mongoose.model("Message", MessageSchema);

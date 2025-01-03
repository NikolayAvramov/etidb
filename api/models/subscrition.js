const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner: { type: String, required: true },
    addres: { type: String },
    name: { type: String, required: true },
    status: { type: String, required: true },
    expireAt: { type: String, required: true },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);

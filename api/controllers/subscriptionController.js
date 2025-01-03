const Subscription = require("../models/subscrition");
const mongoose = require("mongoose");

exports.post_subscription = async (req, res, next) => {
    try {
        const subscription = new Subscription({
            _id: new mongoose.Types.ObjectId(),
            owner: req.body.owner,
            address: req.body.address,
            name: req.body.name,
            expireAt: req.body.expireAt,
            status: req.body.status,
        });

        const result = await subscription.save();

        res.status(200).json({
            message: "Order sended successfully",
        });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: error });
    }
};
// exports.get_subscriptions = async (req, res, next) => {
//     try {
//         const docs = await Subscription.find().exec();

//         const result = {
//             count: docs.length,
//             subscriptions: docs,
//         };

//         res.status(200).json(result);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
exports.get_my_subscriptions = async (req, res, next) => {
    try {
        const id = req.params.id;

        const docs = await Subscription.find({ owner: id }).exec();

        const result = {
            count: docs.length,
            subscriptions: docs,
        };

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// exports.modify_subscription = async (req, res, next) => {
//     try {
//         const id = req.params.id;

//         // Find the existing subscription by ID
//         const existing = await Subscription.findById(id);

//         if (!existing) {
//             return res.status(404).json({ message: "Subscription not found" });
//         }

//         // Update subscription fields
//         existing.owner = req.body.owner || existing.owner;
//         existing.address = req.body.address || existing.address;
//         existing.expireAt = req.body.expireAt || existing.expireAt;
//         existing.name = req.body.name || existing.name;
//         existing.status = req.body.status || existing.status;

//         // Save the updated subscription to the database
//         await existing.save();

//         // Send the updated subscription as the response
//         res.status(200).json(existing);
//     } catch (err) {
//         res.status(500).json({
//             message: "Failed to update subscription",
//             error: err.message,
//         });
//     }
// };

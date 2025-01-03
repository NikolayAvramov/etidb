const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const subscriptionController = require("../controllers/subscriptionController");

// router.get("/", subscriptionController.get_subscriptions);
router.post("/", subscriptionController.post_subscription);
router.get("/:id", subscriptionController.get_my_subscriptions);

module.exports = router;

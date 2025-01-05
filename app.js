const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./api/routes/userRoutes");
const subscriptionRoutes = require("./api/routes/subscriptionRoutes");

// MongoDB connection
mongoose.connect("mongodb+srv://avramov94:123456@eti.jkbc7.mongodb.net/");

// Middleware for logging HTTP requests
app.use(morgan("dev"));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS configuration
app.use(cors());
app.options("*", cors()); // Handle preflight requests

// Routes
app.use("/users", userRoutes);
app.use("/subscriptions", subscriptionRoutes);

// Handle 404 errors
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: "test",
        },
    });
});

// Export the app module
module.exports = app;

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); // Importing cors package

const userRoutes = require("./api/routes/userRoutes");
const subscriptionRoutes = require("./api/routes/subscriptionRoutes");

// MongoDB connection
mongoose.connect("mongodb+srv://eti.jkbc7.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware for logging HTTP requests
app.use(morgan("dev"));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS configuration
const allowedOrigins = ["http://localhost:3000", "https://your-production-domain.com"];
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true); // Allow the request
            } else {
                callback(new Error("Not allowed by CORS")); // Reject the request
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    })
);

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
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

// Export the app module
module.exports = app;

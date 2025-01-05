const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./api/routes/userRoutes");
const subscriptionRoutes = require("./api/routes/subscriptionRoutes");
//mongoose.connect("mongodb+srv://avramov94:123456@eti.jkbc7.mongodb.net/");

mongoose.connect("mongodb+srv://eti.jkbc7.mongodb.net/");

app.use(morgan("dev")); ///  Morgan is a middleware library for logging HTTP requests in Node.js applications. It simplifies the process of monitoring and debugging by providing detailed logs for each request made to your server. These logs can include the request method, URL, status code, response time, and more.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // frontend URL
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Accept, Authorization, Content-Type, X-Parse-Revocable-Session, X-Parse-Session-Token"
    );

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH");
        return res.status(200).json({});
    }
    next();
});

app.use("/users", userRoutes);
app.use("/subscriptions", subscriptionRoutes);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error,
        },
    });
});
module.exports = app;

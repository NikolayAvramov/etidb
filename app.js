const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./api/routes/userRoutes");
const subscriptionRoutes = require("./api/routes/subscriptionRoutes");
mongoose
    .connect("mongodb://127.0.0.1:27017/eti", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err.message);
    });

// mongoose.connect("mongodb://localhost:27017/eti?directConnection=true");

app.use(morgan("dev")); ///  Morgan is a middleware library for logging HTTP requests in Node.js applications. It simplifies the process of monitoring and debugging by providing detailed logs for each request made to your server. These logs can include the request method, URL, status code, response time, and more.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Accept, Authorization,Content-Type,X-Parse-Revocable-Session,X-Parse-Session-Token"
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

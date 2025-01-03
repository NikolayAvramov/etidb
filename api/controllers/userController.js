const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");


exports.get_user = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        return res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.delUser = async (req, res) => {
    const id = req.params.userId;
    try {
        const user = await User.findById(id);

        if (!user) {
            throw new Error("User not found");
        }
        await user.deleteOne();
        res.json({ message: "User removed" });
    } catch (err) {
        return res.status(404).json({
            message: "User not found",
        });
    }
};
exports.login = async (req, res, next) => {
    try {
        const user = await User.find({
            email: req.body.email,
        });

        if (user.length < 1) {
            return res.status(401).json({
                message: "Auth fail user",
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth fail compare",
                    error: err,
                });
            }
            if (result) {
             

                return res.status(200).json({
                    message: "Auth successful",
                   
                    id: user[0]._id,
                    firstName: user[0].firstName,
                    lastName: user[0].lastName,
                    email: user[0].email,
                    address: user[0].address,
                    phone: user[0].phone,
                });
            }
            res.status(401).json({
                message: "Auth fail end",
            });
        });
    } catch (err) {
        res.status(401).json({
            message: "Auth fail",
            err,
        });
    }
};

exports.register = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(409).json({ message: "User with that email already exist" });
        }

        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({ error: "Internal server error" });
            }

            try {
                const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                });

                const savedUser = await newUser.save();

               
                return res.status(200).json({
                    message: "Auth successful",
                    id: newUser._id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                });
            } catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.modify_user = async (req, res, next) => {
    try {
        const id = req.body.id;

        // Find the existing subscription by ID
        const existing = await User.findById(id);
        console.log(existing);
        if (!existing) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update profile fields
        existing.firstName = req.body.firstName || existing.firstName;
        existing.address = req.body.address || existing.address;
        existing.email = req.body.email || existing.email;
        existing.lastName = req.body.lastName || existing.lastName;
        existing.phone = req.body.phone || existing.phone;
        existing.password = req.body.password || existing.password;

        // Save the updated user to the database
        await existing.save();

        // Send the updated user as the response
        res.status(200).json(existing);
    } catch (err) {
        res.status(500).json({
            message: "Failed to update subscription",
            error: err.message,
        });
    }
};

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const userController = require("../controllers/userController");

router.get("/:id", userController.get_user);
router.post("/signup", userController.register);
router.post("/signin", userController.login);
router.put("/update", userController.modify_user);

router.delete("del/:userId", userController.delUser);
module.exports = router;

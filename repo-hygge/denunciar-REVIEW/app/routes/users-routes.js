"use strict";
const express = require("express");
const router = express.Router();

const getUserbudReviewsById = require("../controllers/users/denuncias-controllers");

router.route("/id:/users").get(getUserbudReviewsById);

module.exports = router;

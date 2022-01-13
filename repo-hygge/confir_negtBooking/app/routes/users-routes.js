"use strict";
const express = require("express");
const router = express.Router();
const validateUser = require("../controllers/users/activate-user-controller");
const getUserbudReviewsById = require("../controllers/users/ver-denuncias-controllers");

// Endpoints Públicos

router.route("/activation").get(validateUser);
router.route("/id:/reviews").get(getUserbudReviewsById);

module.exports = router;

"use strict";
const express = require("express");
const router = express.Router();
const validateUser = require("../controllers/users/activate-user-controller");

// Endpoints Públicos

router.route("/activation").get(validateUser);

module.exports = router;

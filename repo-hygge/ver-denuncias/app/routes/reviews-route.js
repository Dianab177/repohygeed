"use strict";

const express = require("express");

const validateAuth = require("../middlewares/validate-auth");
const getUserBudReviewsById = require("../controllers/users/ver-denuncias-controllers");

const router = express.Router();

router.route("/:id").all(validateAuth).delete(getUserBudReviewsById);

module.exports = router;

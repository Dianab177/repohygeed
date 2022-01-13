"use strict";

const express = require("express");
const createBooking = require("../controllers/bookings/crear_reserva_controllers.js");

const validateAuth = require("../middlewares/validate-auth");

const router = express.Router();

router.route("/").post(createBooking);

module.exports = router;

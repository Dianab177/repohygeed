"use strict";

const express = require("express");
const router = express.Router();
const validateUser = require("../middlewares/validate-auth");
const addFavouriteBySpaceId = require("../controllers/spaces/fav-sepaces-users");

// Endpoints Públicos

router.route("/activation").get(validateUser);
router.route("/:id/espacios").get(addFavouriteBySpaceId);

module.exports = router;

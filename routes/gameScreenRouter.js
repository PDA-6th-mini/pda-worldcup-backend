const express = require("express");
const router = express.Router();
const { getGameScreen } = require("../controllers/gameScreenRouterController");

//problem, img get
router.get("/:problemId", getGameScreen);

module.exports = router;

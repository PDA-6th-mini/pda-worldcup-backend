const express = require("express");
const router = express.Router();
const { getResultRatio } = require("../controllers/resultRationController");

// GET /results/:problemId/ratio
router.get("/result-ratio/:problemId", getResultRatio);

module.exports = router;

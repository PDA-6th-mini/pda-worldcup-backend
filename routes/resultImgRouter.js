const express = require("express");
const router = express.Router();
const { getResultImg } = require("../controllers/resultImgController");

router.get("/resultImg", getResultImg);

module.exports = router;

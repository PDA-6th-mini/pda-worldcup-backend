const express = require("express");
const router = express.Router();

const { insertImageMeta } = require("../controllers/resultSaveController");

router.post("/resultSave", insertImageMeta); // 예: /imageMeta?img_id=5

module.exports = router;

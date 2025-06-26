const express = require("express");
const { problemGenerate } = require("../controllers/problemGenerateController");
const uploadWithUrls = require("../configs/multerConfig");

const router = express.Router();

// S3 업로드 설정을 사용하여 form-data 처리
router.post("/", uploadWithUrls, problemGenerate);

module.exports = router;

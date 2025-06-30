const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const s3 = require("../common/s3"); // S3 클라이언트 불러오기

// S3 스토리지 설정
const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.S3_BUCKET_NAME,
  key: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // 이름 변환 중
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    const finalPath = `images/${uniqueSuffix}${path.extname(
      file.originalname
    )}`;

    // 업로드 과정 로그
    console.log(`S3 업로드 중: ${file.originalname} → ${finalPath}`);

    cb(null, finalPath);
  },
  contentType: multerS3.AUTO_CONTENT_TYPE,
});

// multer 설정
const upload = multer({
  storage: s3Storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 10MB 제한
  },
  fileFilter: function (req, file, cb) {
    // 이미지 파일만 허용
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("이미지 파일만 업로드 가능합니다."), false);
    }
  },
});

// 여러 필드를 처리하는 미들웨어 생성
const uploadFields = upload.fields([
  { name: "files", maxCount: 16 }, // files 필드에서 최대 16개 파일
  { name: "title", maxCount: 1 }, // title 텍스트 필드
  { name: "description", maxCount: 1 }, // description 텍스트 필드
]);

// S3 URL을 req 객체에 저장하는 커스텀 미들웨어
const uploadWithUrls = (req, res, next) => {
  uploadFields(req, res, (err) => {
    if (err) {
      return next(err);
    }

    // S3 URL들을 req 객체에 저장
    if (req.files && req.files.files) {
      req.uploadedUrls = req.files.files.map((file) => ({
        location: file.location,
        name: file.originalname,
      }));
      console.log(`${req.uploadedUrls.length}개 파일의 S3 URL 저장 완료`);
    }
    next();
  });
};

module.exports = uploadWithUrls;

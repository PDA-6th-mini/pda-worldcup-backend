const { successResponse, failResponse } = require("../common/Response");
const { saveImageMeta } = require("../services/resultSaveService");

const resultSaveController = {
  insertImageMeta: async (req, res) => {
    const imgId = req.query.img_id;
    if (!imgId) {
      return res.status(400).json(failResponse(400, "img_id가 필요합니다."));
    }

    try {
      await saveImageMeta(imgId);
      return res.json(successResponse(200, "image_meta 저장 성공", null));
    } catch (err) {
      console.error("image_meta 저장 실패:", err);
      return res.status(500).json(failResponse(500, "서버 오류"));
    }
  },
};

module.exports = resultSaveController;

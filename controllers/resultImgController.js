const { successResponse, failResponse } = require("../common/Response");
const { readSuccess } = require("../common/responseMessages");
const { getWinnerImgById } = require("../services/resultImgService");

const resultImgController = {
  getResultImg: async (req, res) => {
    const imgId = req.query.img_id; // ✅ 이게 맞음
    console.log("요청된 imgId:", imgId);

    if (!imgId) {
      return res.status(400).json(failResponse(400, "imgId 값이 없습니다."));
    }

    try {
      const img = await getWinnerImgById(imgId);
      console.log("불러온 이미지 데이터:", img);
      res.json(successResponse(readSuccess.status, readSuccess.message, img));
    } catch (error) {
      console.error("Error in resultImgController:", error);
      res.status(500).json(failResponse(500, "Internal Server Error"));
    }
  },
};

module.exports = resultImgController;

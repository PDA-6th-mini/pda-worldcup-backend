const { successResponse, failResponse } = require("../common/Response");
const { readSuccess } = require("../common/responseMessages");
const { getWinnerRatio } = require("../services/resultRatioService");

const resultRatioController = {
  getResultRatio: async (req, res) => {
    const { problemId } = req.params;
    console.log(req.params);

    if (!problemId) {
      return res
        .status(400)
        .json(failResponse(400, "problem_id 값이 없습니다."));
    }

    try {
      const ratioResult = await getWinnerRatio(problemId);
      console.log("비율쿼리돌린결과", ratioResult);
      res.json(
        successResponse(readSuccess.status, readSuccess.message, ratioResult)
      );
    } catch (error) {
      console.error("Error in resultRatioController:", error);
      res.status(500).json(failResponse(500, "Internal Server Error"));
    }
  },
};

module.exports = resultRatioController;

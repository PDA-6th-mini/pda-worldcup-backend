const { getImgs } = require("../services/gameScreenService");
const { failResponse, successResponse } = require("../common/Response");
const { readSuccess } = require("../common/responseMessages");

const gameScreenRouterController = {
  getGameScreen: async (req, res) => {
    const { problemId } = req.params;
    if (!problemId) {
      return res
        .status(400)
        .json(failResponse(400, "problem_id 값이 없습니다."));
    }
    try {
      const gameImgs = await getImgs(problemId);
      res.json(
        successResponse(readSuccess.status, readSuccess.message, gameImgs)
      );
    } catch (error) {
      console.error("Error in resultRatioController:", error);
      res.status(500).json(failResponse(500, "Internal Server Error"));
    }
  },
};

module.exports = gameScreenRouterController;

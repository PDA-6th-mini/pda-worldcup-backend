const { getImgs } = require("../services/gameScreenService");
const { failResponse, successResponse } = require("../common/Response");
const { readSuccess } = require("../common/responseMessages");

function shuffleArray(array) {
  // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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
      const shuffledImgs = shuffleArray(gameImgs);

      res.json(
        successResponse(readSuccess.status, readSuccess.message, shuffledImgs)
      );
    } catch (error) {
      console.error("Error in gameScreenRouterController:", error);
      res.status(500).json(failResponse(500, "Internal Server Error"));
    }
  },
};

module.exports = gameScreenRouterController;

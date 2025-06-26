const { insertImage, insertProblem } = require("../services/problemGenerate");
const { successResponse, failResponse } = require("../common/Response");
const responseMessage = require("../common/responseMessages");

const problemGenerateController = {
  problemGenerate: async (req, res) => {
    try {
      // form-data에서 텍스트 필드들 추출
      const { title, description } = req.body;

      // multer 미들웨어에서 전달받은 S3 URL들

      const result = await insertProblem({
        name: title,
        description,
      });
      const { insertId } = result;

      await insertImage(
        req.uploadedUrls.map((url) => ({
          problem_id: insertId,
          img_name: url.name.split(".")[0],
          img_url: url.location,
        }))
      );
      res.status(200).json(successResponse(200, responseMessage.createSuccess));
    } catch (error) {
      console.error("Controller error:", error);
      res.status(500).json(failResponse(500, error));
    }
  },
};

module.exports = problemGenerateController;

const { successResponse, failResponse } = require("../common/Response");
const { readSuccess } = require("../common/responseMessages")
const { getProblems } = require("../services/mainService");

const board = {
    mainPage: async (req, res) => {
        const problems = await getProblems();
        res.json(successResponse(readSuccess.status, readSuccess.message, problems));
    }
}

module.exports = board;
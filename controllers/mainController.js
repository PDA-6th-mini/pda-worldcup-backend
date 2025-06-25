const { successResponse, failResponse } = require("../common/Response");
const { readSuccess } = require("../common/responseMessages")
const mainService = require("../services/mainService");

const main = {
    mainPage: async (req, res) => {
        const problems = await mainService.getProblems();
        res.json(successResponse(readSuccess.status, readSuccess.message, problems));
    }
}

module.exports = main;

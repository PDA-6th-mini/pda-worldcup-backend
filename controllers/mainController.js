const { successResponse, failResponse } = require('../common/Response');
const { readSuccess } = require('../common/responseMessages');
const mainService = require('../services/mainService');

const main = {
	mainPage: async (req, res) => {
		const {
			cursor_problem_id,
		} = req.query;

		// 숫자형으로 파싱
		const cursor = cursor_problem_id
			? {
				cursor_problem_id: Number(cursor_problem_id),
			}
			: null;


		const problems = await mainService.getProblems(cursor);
		console.log(problems)

		res.json(successResponse(readSuccess.status, readSuccess.message, problems));
	},
};

module.exports = main;

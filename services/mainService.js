const pool = require('../common/database');
const { selectProblems } = require('../dao/mainDao');

const mainService = {
    /**
     * 목요일 TODO
     * 1. 예외처리를 해야되는데 : arr가 0이면.... image data를 다시 조회해서 그 위에있는거 상위 2개 그냥 가져와서 response 준다.
     */

    getProblems: async () => {
        const conn = await pool.getConnection();
        const rows = await selectProblems(conn);
        const parsed = _parseData(rows);

        return parsed;
    },
}

/**
 * 
 * @param {Array} rows 
 * @returns Object
 */
const _parseData = (rows) => {
    const problemData = {};

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const problemId = row.problem_id;

        if (!problemData[problemId]) {
            problemData[problemId] = {
                problem_id: problemId,
                name: row.name,
                description: row.description,
                images: [],
            };
        }

        problemData[problemId].images.push({
            img_id: row.img_id,
            img_url: row.img_url,
        });
    }

    return Object.values(problemData);
};

module.exports = mainService;

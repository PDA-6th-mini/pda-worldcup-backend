const pool = require('../common/database');
const { selectProblems } = require('../dao/mainDao');

const mainService = {
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

    return problemData;
};

module.exports = mainService;

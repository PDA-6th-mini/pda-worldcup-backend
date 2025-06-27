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
        conn.release();
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
    const problemMap = new Map();

    for (const row of rows) {
        const problemId = String(row.problem_id);

        if (!problemMap.has(problemId)) {
            problemMap.set(problemId, {
                problem_id: problemId,
                name: row.name,
                description: row.description,
                images: [],
            });
        }

        problemMap.get(problemId).images.push({
            img_id: row.img_id,
            img_url: row.img_url,
        });
    }

    return Array.from(problemMap.values());
};


module.exports = mainService;

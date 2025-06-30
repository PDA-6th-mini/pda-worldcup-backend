// mainService.js
const pool = require('../common/database');
const { selectProblems } = require('../dao/mainDao');

const mainService = {
    getProblems: async (cursor) => {
        const conn = await pool.getConnection();
        const rows = await selectProblems(conn, cursor);
        conn.release();

        // 문제별 이미지 묶기 + 커서 필드 포함
        const parsedProblems = _parseData(rows);

        let nextCursor = null;
        if (parsedProblems.length > 0) {
            const lastProblem = parsedProblems[parsedProblems.length - 1];
            const lastImage = lastProblem.images.at(-1);

            nextCursor = {
                cursor_total_count: lastProblem.total_count,
                cursor_count: lastProblem.images.length,
                cursor_img_id: lastImage?.img_id,
            };
            console.log(nextCursor)
        }

        return {
            data: parsedProblems,
            nextCursor,
        };
    },
};

/**
 * rows를 문제 단위로 묶고, 커서에 필요한 필드도 포함
 * @param {Array} rows
 * @returns {Array} 문제 리스트 (images 포함)
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
                total_count: Number(row.total_count),
            });
        }

        problemMap.get(problemId).images.push({
            img_id: row.img_id,
            img_url: row.img_url,
            count: Number(row.count),
        });
    }

    return Array.from(problemMap.values());
};

module.exports = mainService;

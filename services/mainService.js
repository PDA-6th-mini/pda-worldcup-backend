const pool = require('../common/database');
const { selectProblems } = require('../dao/mainDao');

const mainService = {
    getProblems: async (cursor) => {
        const conn = await pool.getConnection();
        const rows = await selectProblems(conn, cursor);
        const parsedProblems = _parseData(rows);

        let nextCursor = null;
        if (parsedProblems.length > 0) {
            const lastProblem = parsedProblems[parsedProblems.length - 1];
            nextCursor = {
                cursor_problem_id: Number(lastProblem.problem_id),
            };
        }

        conn.release();

        return {
            data: parsedProblems,
            nextCursor,
        };
    },
};

const _parseData = (rows) => {
    const problemMap = new Map();

    for (const row of rows) {
        const problemId = String(row.problem_id);

        if (!problemMap.has(problemId)) {
            problemMap.set(problemId, {
                problem_id: Number(problemId),
                name: row.name,
                description: row.description,
                images: [],
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

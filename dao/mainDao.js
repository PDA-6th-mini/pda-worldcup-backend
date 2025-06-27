const mainDao = {
    selectProblems: async (connection) => {
        const query = `
SELECT
    p.problem_id, 
    p.name,
    p.description, 
    i.img_id,
    i.img_url, 
    COUNT(im.img_id) AS count,
    ptc.TOTAL_COUNT
    FROM img i
    LEFT JOIN image_meta im ON i.img_id = im.img_id
    JOIN problem p ON i.problem_id = p.problem_id
    LEFT JOIN (
        SELECT 
            i.problem_id, 
            COUNT(i.img_id) AS TOTAL_COUNT
        FROM img i
        JOIN image_meta im ON i.img_id = im.img_id
        GROUP BY i.problem_id
        ) AS ptc ON p.problem_id = ptc.problem_id
        GROUP BY p.problem_id, p.name, p.description, i.img_id, i.img_url, ptc.TOTAL_COUNT
        ORDER BY ptc.TOTAL_COUNT DESC, count DESC;`

        const selectedRow = await connection.query(query);
        return selectedRow;
    },

}

module.exports = mainDao;

const mainDao = {
    selectProblems: async (connection) => {
        const query = `SELECT p.problem_id, im.img_id, COUNT(*) as count
                        FROM image_meta im
                        JOIN img i ON im.img_id = i.img_id
                        JOIN problem p ON i.problem_id = p.problem_id
                        GROUP BY p.problem_id, im.img_id
                        ORDER BY p.problem_id ASC, count DESC;`;
        const selectedRow = await connection.query(query);
        return selectedRow;
    },

}

module.exports = mainDao;

const mainDao = {
    selectProblems: async (connection) => {
        const query = `
            SELECT 
            p.problem_id, 
            p.name, 
            p.description, 
            i.img_id, 
            i.img_url, 
            COUNT(im.img_id) AS count
            FROM img i
            LEFT JOIN image_meta im ON i.img_id = im.img_id
            JOIN problem p ON i.problem_id = p.problem_id
            GROUP BY p.problem_id, i.img_id
            ORDER BY p.problem_id ASC, count DESC;`

        const selectedRow = await connection.query(query);
        return selectedRow;
    },

}

module.exports = mainDao;

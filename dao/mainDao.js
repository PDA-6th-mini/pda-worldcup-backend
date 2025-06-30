// mainDao.js
const mainDao = {
    selectProblems: async (connection, cursor) => {
        const query = `
        WITH top_problems AS (
          SELECT 
            p.problem_id,
            ptc.total_count,
            COUNT(im.img_id) AS count,
            MAX(i.img_id) AS max_img_id
          FROM img i
          JOIN problem p ON i.problem_id = p.problem_id
          LEFT JOIN image_meta im ON i.img_id = im.img_id
          LEFT JOIN (
            SELECT 
              i.problem_id, 
              COUNT(im.img_id) AS total_count
            FROM img i
            LEFT JOIN image_meta im ON i.img_id = im.img_id
            GROUP BY i.problem_id
          ) AS ptc ON p.problem_id = ptc.problem_id
          GROUP BY p.problem_id, ptc.total_count
          HAVING 
            (ptc.total_count < ?)
            OR (ptc.total_count = ? AND COUNT(im.img_id) < ?)
            OR (ptc.total_count = ? AND COUNT(im.img_id) = ? AND MAX(i.img_id) < ?)
          ORDER BY ptc.total_count DESC, COUNT(im.img_id) DESC, MAX(i.img_id) DESC
          LIMIT 8
        )
            
        SELECT 
          p.problem_id,
          p.name,
          p.description,
          i.img_id,
          i.img_url,
          COUNT(im.img_id) AS count,
          ptc.total_count
        FROM top_problems tp
        JOIN problem p ON p.problem_id = tp.problem_id
        JOIN img i ON i.problem_id = p.problem_id
        LEFT JOIN image_meta im ON im.img_id = i.img_id
        LEFT JOIN (
          SELECT 
            i.problem_id, 
            COUNT(im.img_id) AS total_count
          FROM img i
          LEFT JOIN image_meta im ON i.img_id = im.img_id
          GROUP BY i.problem_id
        ) AS ptc ON p.problem_id = ptc.problem_id
        GROUP BY i.img_id, p.problem_id, p.name, p.description, ptc.total_count
        ORDER BY ptc.total_count DESC, count DESC, i.img_id DESC;`

        const params = [
            cursor?.cursor_total_count ?? Number.MAX_SAFE_INTEGER,
            cursor?.cursor_total_count ?? Number.MAX_SAFE_INTEGER,
            cursor?.cursor_count ?? Number.MAX_SAFE_INTEGER,
            cursor?.cursor_total_count ?? Number.MAX_SAFE_INTEGER,
            cursor?.cursor_count ?? Number.MAX_SAFE_INTEGER,
            cursor?.cursor_img_id ?? Number.MAX_SAFE_INTEGER,
        ];

        const rows = await connection.query(query, params);
        return rows;
    },
};

module.exports = mainDao;

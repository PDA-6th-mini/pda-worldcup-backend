// mainDao.js
const mainDao = {
  selectProblems: async (connection, cursor) => {
    const query = `
    WITH problem_cursor AS (
      SELECT problem_id
      FROM problem
      WHERE problem_id < ?
      ORDER BY problem_id DESC
      LIMIT 8
    ),
    img_with_meta_count AS (
      SELECT 
        i.img_id,
        i.problem_id,
        i.img_url,
        COUNT(im.img_id) AS meta_count
      FROM img i
      LEFT JOIN image_meta im ON i.img_id = im.img_id
      GROUP BY i.img_id, i.problem_id, i.img_url
    )
    SELECT 
      p.problem_id,
      p.name,
      p.description,
      i.img_id,
      i.img_url,
      imc.meta_count
    FROM problem_cursor pc
    JOIN problem p ON p.problem_id = pc.problem_id
    JOIN img_with_meta_count imc ON imc.problem_id = p.problem_id
    JOIN img i ON i.img_id = imc.img_id
    ORDER BY p.problem_id DESC, imc.meta_count DESC, i.img_id DESC;
    `

    const params = [
      cursor?.cursor_problem_id ?? Number.MAX_SAFE_INTEGER
    ];


    const rows = await connection.query(query, params);
    return rows;
  },
};

module.exports = mainDao;

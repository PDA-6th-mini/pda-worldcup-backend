// mainDao.js
const mainDao = {
  selectProblems: async (connection, cursor) => {
    const query = `
    SELECT 
    p.problem_id,
    p.name,
    p.description,
    i.img_id,
    i.img_url,
    COUNT(im.img_id) AS meta_count
    FROM (
      SELECT *
      FROM problem
      WHERE problem_id < ?
      ORDER BY problem_id DESC
      LIMIT 8
    ) AS p
    JOIN img i ON i.problem_id = p.problem_id
    LEFT JOIN image_meta im ON im.img_id = i.img_id
    GROUP BY i.img_id, p.problem_id, p.name, p.description, i.img_url
    ORDER BY p.problem_id DESC, meta_count DESC, i.img_id DESC;
    `
    const params = [
      cursor?.cursor_problem_id ?? Number.MAX_SAFE_INTEGER
    ];


    const rows = await connection.query(query, params);
    return rows;
  },
};

module.exports = mainDao;

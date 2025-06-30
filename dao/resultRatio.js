const resultRatioDao = {
  selectWinnerRatio: async (connection, problemId) => {
    const query = `SELECT 
        im.img_id,
        i.img_url,
        i.img_name,
        p.name AS problem_name,
        COUNT(*) as cnt,
        ROUND(COUNT(*) / SUM(COUNT(*)) OVER() * 100, 2) AS win_ratio_percent
      FROM image_meta im
      JOIN img i ON im.img_id = i.img_id
      JOIN problem p ON i.problem_id = p.problem_id
      WHERE i.problem_id = ?
      GROUP BY im.img_id
      ORDER BY cnt DESC;
;`;
    const rows = await connection.query(query, [problemId]);
    return rows;
  },
};

module.exports = resultRatioDao;

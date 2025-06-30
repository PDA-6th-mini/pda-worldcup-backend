const gameScreenDao = {
  selectImgs: async (connection, problemId) => {
    const query = `SELECT 
  p.problem_id,
  p.name,
  p.description,
  i.img_id,
  i.img_name,
  i.img_url
  FROM problem p
  JOIN img i ON p.problem_id = i.problem_id
  WHERE p.problem_id = ?;
`;
    const rows = await connection.query(query, [problemId]);
    return rows;
  },
};

module.exports = gameScreenDao;

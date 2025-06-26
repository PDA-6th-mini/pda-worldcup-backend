const problemGenerateDao = {
  insertProblem: async (connection, problem) => {
    const query = `INSERT INTO problem (name, description) VALUES (?, ?)`;
    const rows = await connection.query(query, [
      problem.name,
      problem.description,
    ]);
    return rows;
  },
  insertImage: async (connection, data) => {
    // data가 배열인지 확인
    const dataArray = Array.isArray(data) ? data : [data];

    if (dataArray.length === 0) {
      return [];
    }

    // VALUES 절을 동적으로 생성
    const valuesPlaceholders = dataArray.map(() => "(?, ?, ?)").join(", ");
    const query = `INSERT INTO img (problem_id, img_name, img_url) VALUES ${valuesPlaceholders}`;

    // 모든 데이터를 평면화하여 쿼리 파라미터로 전달
    const params = dataArray.flatMap((item) => [
      item.problem_id,
      item.img_name,
      item.img_url,
    ]);

    const rows = await connection.query(query, params);
    return rows;
  },
};

module.exports = problemGenerateDao;

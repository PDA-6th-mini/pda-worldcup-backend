const resultImgDao = {
  selectWinnerImg: async (connection, imgId) => {
    const query = `
        SELECT img_name, img_url
        FROM img
        WHERE img_id = ?
      `;
    const [rows] = await connection.query(query, [imgId]); // ✅ Prepared Statement
    return rows; // 보통 하나만 나올 테니까 첫 번째만 반환
  },
};

module.exports = resultImgDao;

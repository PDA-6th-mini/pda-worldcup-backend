const pool = require("../common/database"); // DB 커넥션 풀
const { selectImgs } = require("../dao/gameScreenDao");

const gameScreenService = {
  getImgs: async (problemId) => {
    const conn = await pool.getConnection();
    try {
      const rows = await selectImgs(conn, problemId);
      return rows;
    } finally {
      conn.release(); // 반드시 release()로 커넥션 반납
    }
  },
};

module.exports = gameScreenService;

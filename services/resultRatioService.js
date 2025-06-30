const pool = require("../common/database"); // DB 커넥션 풀
const { selectWinnerRatio } = require("../dao/resultRatio");

const resultRatioService = {
  getWinnerRatio: async (problemId) => {
    const conn = await pool.getConnection();
    try {
      const rows = await selectWinnerRatio(conn, problemId);
      conn.release();

      if (rows.length === 0) return null;

      const { problem_name } = rows[0]; // 모든 행에서 동일
      const result = rows.map(
        ({ img_name, cnt, win_ratio_percent, img_url }) => ({
          img_name,
          cnt,
          win_ratio_percent,
          img_url,
        })
      );

      return {
        problem_name,
        result,
      };
    } catch (error) {
      conn.release();
      throw error;
    }
  },
};

module.exports = resultRatioService;

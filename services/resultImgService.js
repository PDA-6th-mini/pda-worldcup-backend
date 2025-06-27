const pool = require("../common/database"); // DB 커넥션 풀
const resultImgDao = require("../dao/resultImgDao");

const resultImgService = {
  getWinnerImgById: async (imgId) => {
    const conn = await pool.getConnection();
    try {
      const img = await resultImgDao.selectWinnerImg(conn, imgId);
      return img;
    } finally {
      conn.release();
    }
  },
};

module.exports = resultImgService;

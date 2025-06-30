const pool = require("../common/database");
const resultSaveDao = require("../dao/resultSaveDao");

const resultSaveService = {
  saveImageMeta: async (imgId) => {
    const conn = await pool.getConnection();
    try {
      await resultSaveDao.insertImageMeta(conn, imgId);
    } finally {
      conn.release();
    }
  },
};

module.exports = resultSaveService;

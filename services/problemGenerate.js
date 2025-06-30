const pool = require("../common/database");
const { insertProblem, insertImage } = require("../dao/problemGenerateDao");

const problemGenerateService = {
  getProblems: async () => {
    const conn = await pool.getConnection();
    const rows = await selectProblems(conn);
    conn.end(); // connection을 꼭 끊어주셔야지, DB 접근 connection이 쌓이면, 연결을 못합니다.

    return rows;
  },
  insertProblem: async (problem) => {
    const conn = await pool.getConnection();
    const rows = await insertProblem(conn, problem);
    conn.end();

    return rows;
  },
  insertImage: async (images) => {
    console.log(images);
    const conn = await pool.getConnection();
    const rows = await insertImage(conn, images);
    conn.end();

    return rows;
  },
};

module.exports = problemGenerateService;

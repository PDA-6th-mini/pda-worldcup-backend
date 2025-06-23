const pool = require('../common/database');
const { selectProblems } = require('../dao/mainDao');

const mainService = {
    getProblems: async () => {
        const conn = await pool.getConnection();
        const rows = await selectProblems(conn);
        conn.end(); // connection을 꼭 끊어주셔야지, DB 접근 connection이 쌓이면, 연결을 못합니다.
        
        return rows;
    }
}

module.exports = mainService;

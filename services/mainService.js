const pool = require('../common/database');
const { selectProblems, selectImgId } = require('../dao/mainDao');

const mainService = {
    getProblems: async () => {
        const conn = await pool.getConnection();
        const rows = await selectProblems(conn);
        console.log(rows);
        return rows;
    }
}

module.exports = mainService;

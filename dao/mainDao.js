const mainDao = {
    selectProblems: async (connection) => {
        const query = `SELECT * FROM PROBLEM`;
        const selectedRow = await connection.query(query);
        return selectedRow;
    },

}

module.exports = mainDao;

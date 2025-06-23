const mainDao = {
    selectProblems: async (connection) => {
        const query = `SELECT * FROM PROBLEM`;
        const selectedRow = await connection.query(query);
        console.log(selectedRow)
        return selectedRow;
    },

}

module.exports = mainDao;

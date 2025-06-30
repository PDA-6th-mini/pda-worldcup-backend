const resultSaveDao = {
  insertImageMeta: async (connection, imgId) => {
    const query = `
        INSERT INTO image_meta (img_id, created_at)
        VALUES (?, NOW())
      `;
    await connection.query(query, [imgId]);
  },
};

module.exports = resultSaveDao;

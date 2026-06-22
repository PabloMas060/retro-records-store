const db = require('../../database/models');

module.exports = async (req, res) => {
    try {

        const albums = await db.Album.findAll({
            include: ['band']
        });

        const bands = await db.Band.findAll({
            order: [['name', 'ASC']]
        });

        return res.render('allAlbums', {
            albums,
            bands,
            activeBand: null,
            totalCount: albums.length,
            currentPage: 1,
            totalPages: 1
        });

    } catch (error) {
        console.log(error);
    }
};
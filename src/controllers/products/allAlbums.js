const db = require('../../database/models');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
    try {

        const limit = 8;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;

        const activeBand = req.query.band || null;

        const where = {};

        if (activeBand) {
            where.bandId = activeBand;
        }

        const { count, rows: albums } = await db.Album.findAndCountAll({
            where,
            include: ['band'],
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        const bands = await db.Band.findAll({
            order: [['name', 'ASC']]
        });

        const totalPages = Math.ceil(count / limit);

        return res.render('allAlbums', {
            albums,
            bands,
            activeBand,
            totalCount: count,
            currentPage: page,
            totalPages
        });

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};
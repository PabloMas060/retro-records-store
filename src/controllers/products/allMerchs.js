const db = require('../../database/models');

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

        const { count, rows: merchs } = await db.Merch.findAndCountAll({
            where,
            include: ['band', 'type'],
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        const bands = await db.Band.findAll({
            order: [['name', 'ASC']]
        });

        const totalPages = Math.ceil(count / 8);

        return res.render('allMerchs', {
            merchs,
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
const db = require('../../database/models');

module.exports = async (req, res) => {
    try {

        const merchs = await db.Merch.findAll({
            include: ['band']
        });

        const bands = await db.Band.findAll({
            order: [['name', 'ASC']]
        });

        return res.render('allMerchs', {
            merchs,
            bands,
            activeBand: null,
            totalCount: merchs.length,
            currentPage: 1,
            totalPages: 1
        });

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};
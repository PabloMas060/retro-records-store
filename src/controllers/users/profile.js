const db = require('../../database/models');

module.exports = (req, res) => {
    db.User.findByPk(req.session.userLogin.id, {
        include: [
            {
                model: db.Address,
                as: 'address',
            },
            {
                model: db.Identificator, 
                as: 'identificator', 
            }
        ],
    })
    .then(user => {
        return res.render('profile', {
            user: user,
        });
    })
    .catch(error => console.log(error));
};
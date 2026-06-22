const db = require('../../database/models');

module.exports = (req, res) => {
return res.render('users/login', { title: 'Iniciar Sesión' });
  
}
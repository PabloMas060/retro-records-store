const db = require('../database/models');

module.exports = (req, res, next) => {
  // Determinamos de dónde viene el ID del usuario (Login tradicional o Passport Google)
  let userId = null;

  if (req.session.userLogin) {
    userId = req.session.userLogin.id;
    res.locals.userLogin = req.session.userLogin;
  } else if (req.user) {
    userId = req.user.id;
    // Creamos userLogin para compatibilidad si tus scripts frontend o rutas lo requieren
    res.locals.userLogin = req.user; 
  }

  // Si encontramos un usuario logueado por cualquiera de las dos vías, buscamos sus datos completos
  if (userId) {
    db.User.findByPk(userId, {
      include: [
        { 
          model: db.Address, 
          as: 'address' // Mantenemos únicamente la dirección que sí usás
        }
      ]
    })
    .then(user => {
      res.locals.user = user; // Esta es la variable global que usará tu header y vistas
      next();
    })
    .catch(error => {
      console.log("Error en localsCheck:", error);
      next();
    });
  } else {
    // Si no hay nadie logueado, nos aseguramos de que las variables estén vacías
    res.locals.userLogin = null;
    res.locals.user = null;
    next();
  }
};
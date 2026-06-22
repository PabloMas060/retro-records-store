module.exports = (req, res, next) => {
    if (!req.session.userLogin || req.session.userLogin.rolId !== 1) {
        // Guardamos el mensaje en la sesión (como configuramos antes)
        req.session.errorMessage = ['Acceso denegado: solo para administradores.'];
        return res.redirect('/');
    }
    next();
}
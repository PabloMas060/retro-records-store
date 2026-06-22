const { getOrder } = require('../../services/cartServices');

module.exports = {
    cartView: async (req, res) => {
        try {
            // Buscamos la orden
            const userId = req.session.userLogin.id;
            const order = await getOrder({ userId });

            // Renderizamos la vista usando la ruta completa a tu archivo EJS
            return res.render('users/cart', { order });
        } catch (error) {
            console.error("Error al cargar carrito:", error);
            return res.redirect('/users/login');
        }
    }
};

const sendErrorResponse = require('../../helpers/sendErrorResponse');
const { 
    createProductInCart, 
    removeProductFromCart, 
    moreOrLessQuantityFromProduct, 
    clearAllProductFromCart, 
    modifyStatusFromOrder,
    getOrder 
} = require('../../services/cartServices');

module.exports = {
    addProduct: async (req, res) => {
        try {
            const { albumId } = req.body;
            const { id } = req.session.userLogin;
            await createProductInCart({ userId: id, albumId });
            
            req.session.successMessage = ['¡Producto añadido al carrito!'];
            return res.redirect('/api/cart');
        } catch (error) {
            req.session.errorMessage = ['Error al agregar el producto'];
            return res.redirect('/api/cart');
        }
    },

    removeProduct: async (req, res) => {
        try {
            const { albumId } = req.body;
            const { id } = req.session.userLogin;
            await removeProductFromCart({ userId: id, albumId });
            
            req.session.successMessage = ['Producto eliminado.'];
            return res.redirect('/api/cart');
        } catch (error) {
            req.session.errorMessage = ['Error al eliminar el producto.'];
            return res.redirect('/api/cart');
        }
    },

    clearCart: async (req, res) => {
        try {
            const { id } = req.session.userLogin;
            await clearAllProductFromCart({ userId: id });
            
            req.session.successMessage = ['Carrito vaciado.'];
            return res.redirect('/api/cart');
        } catch (error) {
            req.session.errorMessage = ['Error al vaciar el carrito.'];
            return res.redirect('/api/cart');
        }
    },

    statusOrder: async (req, res) => {
        try {
            const { status } = req.body; 
            const { id } = req.session.userLogin;
            await modifyStatusFromOrder({ userId: id, status: status || 'completed' });
            
            req.session.successMessage = ['¡Compra realizada con éxito!'];
            return res.redirect('/api/cart');
        } catch (error) {
            req.session.errorMessage = ['Error al procesar la compra.'];
            return res.redirect('/api/cart');
        }
    },

    getOrderPending: async (req, res) => {
        try {
            const { id } = req.session.userLogin;
            const order = await getOrder({ userId: id });
            return res.json({ data: order });
        } catch (error) {
            sendErrorResponse(res, error);
        }
    }
};
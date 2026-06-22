const { validationResult } = require('express-validator');
const db = require('../../database/models');

module.exports = (req, res) => {
    const errors = validationResult(req);

    // Con Passport o Session tradicional, buscamos un ID unificado válido
    const userId = req.session.userLogin ? req.session.userLogin.id : (req.user ? req.user.id : null);

    if (!userId) {
        return res.redirect('/users/login');
    }

    if (errors.isEmpty()) {
        const { first_name, fist_name, last_name, nick_name, state, about, address, country, city, province, zipcode, identificator } = req.body;

        // Limpieza segura previniening errores de undefined / null al hacer trim
        const addressData = {
            address: address ? address.trim() : null,
            country: country ? country.trim() : 'Argentina', 
            city: city ? city.trim() : null,
            province: province ? province.trim() : null,
            zipcode: zipcode ? zipcode : null,
        };

        // 1. Buscamos al usuario incluyendo su dirección asignada por 'addressId'
        db.User.findByPk(userId, {
            include: [{
                model: db.Address,
                as: 'address',
            }]
        })
        .then(user => {
            if (user && user.address) {
                // CASO A: El usuario ya tiene una dirección vinculada. La actualizamos.
                return db.Address.update(addressData, {
                    where: { id: user.address.id }
                }).then(() => null); // Retornamos null indicando que no hay un nuevo ID de dirección que asociar
            } else {
                // CASO B: El usuario no tiene dirección vinculada (ej: Login Google).
                // Creamos la dirección primero de forma independiente para generar el ID.
                return db.Address.create(addressData)
                    .then(newAddress => newAddress.id); // Pasamos el ID de la nueva dirección al siguiente .then()
            }
        })
        .then(newAddressId => {
            // Estructuramos los datos del usuario de forma segura
            const userData = {
                first_name: (first_name || fist_name) ? (first_name || fist_name).trim() : '',
                last_name: last_name ? last_name.trim() : '',
                nick_name: nick_name ? nick_name.trim() : '',
                state: state ? state.trim() : null,
                about: about ? about.trim() : null,
                identificatorId: identificator || null
            };

            // Si se creó una dirección en el paso anterior, vinculamos su ID a la columna del usuario
            if (newAddressId) {
                userData.addressId = newAddressId;
            }

            // Si se subió una foto de avatar nueva mediante Multer, la agregamos al update
            if (req.file) {
                userData.avatar = req.file.filename;
            }

            return db.User.update(userData, {
                where: { id: userId }
            });
        })
        .then(() => {
            // 🔄 PASO CLAVE: Volvemos a buscar el usuario actualizado con su dirección incluida para sincronizar sesión
            return db.User.findByPk(userId, {
                include: [{ model: db.Address, as: 'address' }]
            });
        })
        .then(updatedUser => {
            // Actualizamos la sesión tradicional si existe
            if (req.session.userLogin) {
                req.session.userLogin = {
                    ...req.session.userLogin,
                    ...updatedUser.dataValues,
                    address: updatedUser.address ? updatedUser.address.dataValues : null
                };
            }
            
            // Si el login fue por Passport Google OAuth, actualizamos req.user
            if (req.user) {
                Object.assign(req.user, updatedUser.dataValues);
                req.user.address = updatedUser.address ? updatedUser.address.dataValues : null;
            }

            // Redirigimos directo al perfil con los datos refrescados en memoria
            return res.redirect('/users/profile');
        })
        .catch(error => {
            console.log("Error detallado en profileUpdate:", error);
            return res.redirect('/users/profile');
        });

    } else {
        // Manejo de errores de validación volviendo a renderizar la vista
        db.User.findByPk(userId, {
            include: [{ model: db.Address, as: 'address' }]
        })
        .then(user => {
            return res.render('profile', {
                user: user, // Le pasamos el objeto completo como espera localsCheck y el header
                errors: errors.mapped(),
            });
        })
        .catch(error => {
            console.log(error);
            return res.redirect('/');
        });
    } 
};
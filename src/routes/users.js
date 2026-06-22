const express = require('express');
const router = express.Router();
const checkUserLogin = require('../middlewares/checkUserLogin')
const checkUser = require('../middlewares/checkUser');
const checkAdmin = require('../middlewares/checkAdmin');
const { register, processRegister, login, processLogin, profile, admin, logout, profileEdit, profileUpdate } = require('../controllers/usersController');
const registerValidation = require('../validation/registerValidation');
const loginValidation = require('../validation/loginValidation');
const { uploads } = require('../middlewares/uploads');
const profileValidation = require('../validation/profileValidation');
/* /users */

router
.get("/register", checkUser, register)
.post("/register", registerValidation, processRegister)
.get("/login", checkUser, login)
.post("/login", loginValidation, processLogin)
.get('/profile', checkUserLogin, profile)
.get('/edit-profile/:id', checkUserLogin, profileEdit)
.put('/edit-profile/:id', uploads.single('image'), profileValidation, profileUpdate)
.get('/admin', checkAdmin, admin)
.get("/logout", logout)


module.exports = router;

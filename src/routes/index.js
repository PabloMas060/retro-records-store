const express = require('express');
const router = express.Router();
const { index, about, contact, groups, notices, notice, fans, capsule, editProfile, selfcart, giftcart, cardInfo, checkout, prueba1, prueba2, prueba3, prueba4 } = require('../controllers/indexController'); 

/* GET home page. */

router.get('/', index);
router.get('/contact', contact);
router.get('/editProfile.ejs', editProfile);
router.get('/selfcart', selfcart);
router.get('/giftcart', giftcart);
router.get('/cardInfo', cardInfo);
router.get('/checkout', checkout);




module.exports = router;

const express = require('express');
const router = express.Router();
const { albumAdd, albumCreate, mercheAdd, mercheCreate, listArtists, bandDetail, bandAdd, bandCreate, editBand, updateBand, addAlbum, storeAlbum, editAlbum, updateAlbum, addMerch, storeMerch, editMerch, updateMerch,albumDetail, merchDetail, albumRemove, merchRemove, bandRemove, allAlbums, allMerchs } = require('../controllers/productsController');
const { upload } = require('../middlewares/upload');
const addAlbumValidator = require('../validation/addAlbumValidator');
const addMercheValidator = require('../validation/addMercheValidator');
const addBandValidator = require('../validation/addBandValidator');
const editAlbumValidator = require('../validation/editAlbumValidator');
const editMerchValidator = require('../validation/editMercheValidator');
const editBandValidator = require('../validation/editBandValidator');


const { uploadBand } = require('../middlewares/uploadBand');
const { uploadAlbum } = require('../middlewares/uploadAlbum');
const { uploadMerch } = require('../middlewares/uploadMerch');




/* /products */
router
  .get('/albumAdd', albumAdd)
  .post('/albumAdd', uploadAlbum.single('image'), addAlbumValidator, albumCreate)
  .get('/mercheAdd', mercheAdd)
  .post('/mercheAdd', uploadMerch.single('image'), addMercheValidator, mercheCreate)
  .get('/artists', listArtists)
  .get('/artists/detail/:id', bandDetail)
  .get('/addBand', bandAdd)
  .get('/albums', allAlbums)
  .get('/merchs', allMerchs)
  .post('/addBand', uploadBand.fields([
    {
      name: "image",
    },
    {
      name: "images",
    }
  ]), bandCreate)
  .get('/edit/band/:id', editBand)
  .put('/edit/band/:id', uploadBand.fields([
    {
      name: "image",
    },
    {
      name: "images",
    }
  ]),
  editBandValidator,
   updateBand)
  .get('/addAlbum', addAlbum)
  .post('/addAlbum', storeAlbum)
  .get('/edit/album/:id', editAlbum)
  .put('/edit/album/:id', uploadAlbum.single('image'), editAlbumValidator ,updateAlbum)
  .get('/addMerch', addMerch)
  .post('/addMerch', storeMerch)
  .get('/edit/merch/:id', editMerch)
  .put('/edit/merch/:id', uploadMerch.single('image'), editMerchValidator, updateMerch)
  .get('/albums/detail/:id', albumDetail)
  .get('/merchs/detail/:id', merchDetail)
  .delete('/albums/remove/:id',albumRemove) 
  .delete('/merchs/remove/:id',merchRemove)
  .delete('/bands/remove/:id',bandRemove) 
 

module.exports = router;
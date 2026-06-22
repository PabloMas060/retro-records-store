const vinyls = require('../data/vinyls.json');
const shirts = require('../data/shirts.json');
const path = require('path');
const fs = require("fs");
const db = require('../database/models');

module.exports = {
    bandDetail: require('./products/bandDetail'),
    albumAdd: require('./products/albumAdd'),
    albumCreate: require('./products/albumCreate'),
    mercheAdd: require('./products/mercheAdd'),
    mercheCreate: require('./products/mercheCreate'),
    listArtists: require('./products/listArtists'),
    bandAdd: require('./products/bandAdd'),
    bandCreate: require('./products/bandCreate'),
    albumRemove: require('./products/albumRemove'),
    merchRemove: require('./products/merchRemove'),
    bandRemove: require('./products/bandRemove'),

    editBand: require('./products/bandEdit'),
    updateBand: require('./products/bandUpdate'),

    addAlbum: (req, res) => {
        return res.render('./admin/addAlbum');
    },

    storeAlbum: (req, res) => {},

    editAlbum: require('./products/albumEdit'),
    updateAlbum: require('./products/albumUpdate'),

    addMerch: (req, res) => {
        return res.render('./admin/addMerch');
    },

    storeMerch: (req, res) => {},

    editMerch: require('./products/merchEdit'),
    updateMerch: require('./products/merchUpdate'),

    albumDetail: require('./products/albumDetail'),
    merchDetail: require('./products/merchDetail'),

    // NUEVOS
    allAlbums: require('./products/allAlbums'),
    allMerchs: require('./products/allMerchs')
}
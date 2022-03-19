'use strict'

var express = require('express');
var AlbumController = require('../controllers/album');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:'./media'});

router.get('/home', AlbumController.home);
router.post('/test', AlbumController.test);
router.post('/save-album', AlbumController.saveAlbum);
router.get('/album/:id', AlbumController.getAlbum);
router.get('/albums', AlbumController.getAlbums);
router.put('/update-album/:id', AlbumController.updateAlbum);
router.delete('/delete-album/:id', AlbumController.deleleAlbum);
router.post('/upload-image/:id', multipartMiddleware, AlbumController.uploadImage);
router.get('/get-image/:image', AlbumController.getImage);

module.exports = router;
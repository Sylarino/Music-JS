'use strict'
var Album = require('../models/albums');
var fs = require('fs');
// const { exists } = require('../models/albums');
var path = require('path');

var controller = {

    home: function(req, res){
        return res.status(200).send({
            message: "Home"
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: "Metodo test del controlador de Album"
        });
    },

    saveAlbum: function(req, res){
        var album = new Album();

        var params = req.body;

        album.name = params.name;
        album.artist = params.artist;
        album.year = params.year;
        album.genre = params.genre;
        album.description = params.description;
        album.songs = params.songs;

        album.save((err, albumStored) => {
            if (err) return res.status(500).send({message: "Error al guardar el album"});

            if(!albumStored) return res.status(404).send({message: "No se ha podido guardar el album"});

            return res.status(200).send({album: albumStored});
        })
    },

    getAlbum: function(req, res){
        var albumId = req.params.id;

        if(albumId == null){
            return res.status(404).send({message: "Album no existe"});
        }
        Album.findById(albumId, (err, album)=> {
            if (err) return res.status(500).send({message: "Error al devolver el album"});

            if(!album) return res.status(404).send({message: "Album no existe"});

            return res.status(200).send({album});
        });

    },

    getAlbums: function(req, res){

        Album.find({}).sort('-year').exec((err, albums)=>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!albums) return res.status(404).send({message: 'No hay albumes para mostrar'});

            return res.status(200).send({albums});
        })
    },

    updateAlbum: function(req, res){
        var albumId = req.params.id;
        var update = req.body;

        Album.findByIdAndUpdate(albumId, update, {new:true},(err, albumUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!albumUpdated) return res.status(404).send({message: 'No existe el album'});

            return res.status(200).send({album: albumUpdated});
        });
    },

    deleleAlbum: function(req, res){
        var albumId = req.params.id;

        Album.findByIdAndRemove(albumId, (err, albumDeleted)=>{
            if(err) return res.status(500).send({message: 'No se ha podido borrar el album'});

            if(!albumDeleted) return res.status(404).send({message: 'No existe el album'});

            return res.status(200).send({album: albumDeleted});
        });
    },

    uploadImage: function(req, res){
        var albumId = req.params.id;

        var file_name = 'Imagén no subida';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var file_name = fileSplit[1];
            var extSplit = file_name.split('\.');
            var file_ext = extSplit[1];

            if (file_ext=='png' || file_ext=='jpg' || file_ext=='gif' || file_ext=='jpeg') {

                Album.findByIdAndUpdate(albumId, {cover: file_name}, {new:true},(err, albumUpdated) => {
                    if(err) return res.status(200).send({message: 'La imagén no se ha subido'});

                    if(!albumUpdated) return res.status(404).send({message: 'No existe el album'});

                    return res.status(200).send({
                        album: albumUpdated
                    });
                });
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'Extensión no es valida'});
                });
            }

        }else{
            return res.status(200).send({
                message: file_name
            });
        }
    },

    getImage: function(req, res){
        var file = req.params.image;
        var path_file = './media/'+file;

        fs.exists(path_file, (exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({
                    message: 'No existe la imagen'
                });
            }
        });
    }
};

module.exports = controller;
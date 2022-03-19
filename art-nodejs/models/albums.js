'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
    name: String,
    artist: String,
    year: Number,
    genre: String,
    description: String,
    songs: [String],
    cover: String
});

module.exports = mongoose.model('Album', AlbumSchema);
'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/albums')
        .then(() =>{
            console.log('Conexión establecida exitosamente!');

            // Creación del servidor
            app.listen(port, () => {
                console.log("Servidor corriendo... en url localhost:3700");
            });
        })
        .catch(err => console.log(err));

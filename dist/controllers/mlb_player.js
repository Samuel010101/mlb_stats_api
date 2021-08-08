'use strict';
var MlbPlayer = require('../models/mlb_player');
var validator = require('validator');
var controllerMlbPlayer = {
    // Ruta de prueba
    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy el metodo test de prueba del controlador mlbPlayer'
        });
    },
    // RUTAS UTILES
    // Guardar stat de jugador en la base de datos
    saveStatPlayer: (req, res) => {
        // Recoger los parametros por post
        var params = req.body;
        // Validar datos (validator)
        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_team = !validator.isEmpty(params.team);
            var validate_position = !validator.isEmpty(params.position);
            var validate_age = !validator.isEmpty(params.age);
        }
        catch (error) {
            return res.status(500).send({
                message: 'Faltan datos por enviar'
            });
        }
        if (validate_name && validate_team && validate_position && validate_age) {
            // Crear el objeto a guardar
            var mlbPlayer = new MlbPlayer();
            // Asignar valores
            mlbPlayer.name = params.name;
            mlbPlayer.team = params.team;
            mlbPlayer.position = params.position;
            mlbPlayer.age = params.age;
            mlbPlayer.stats = params.stats;
            // Guardar articulo
            mlbPlayer.save((err, mlbPlayerStored) => {
                if (err || !mlbPlayerStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El stat de este jugador no se ha guardado'
                    });
                }
                // Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    mlbPlayer: mlbPlayerStored
                });
            });
        }
        else {
            return res.status(500).send({
                message: 'Los datos no son validos'
            });
        }
    },
    // Extraer stats desde la base de datos
    getMlbPlayer: (req, res) => {
        var searchString = req.params.search;
        // Find
        MlbPlayer.find({
            'name': { '$regex': searchString, '$options': 'i' }
        })
            .exec((err, MlbPlayer) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los stats de jugadores'
                });
            }
            if (!MlbPlayer) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se encontro resultados de la busqueda'
                });
            }
            return res.status(200).send({
                status: 'success',
                MlbPlayer
            });
        });
    }
};
module.exports = controllerMlbPlayer;

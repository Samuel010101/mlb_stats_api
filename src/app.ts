// Cargar modulos de node para crear servidor
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

// Ejecutar express (http)
const app = express();
    
// Cargar ficheros rutas
let mlbPlayer_router = require('./routes/mlb_player');

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Añadir prefijos a rutas = cargar rutas
app.use(mlbPlayer_router);


// Exportar modulo (fichero actual)
module.exports = app
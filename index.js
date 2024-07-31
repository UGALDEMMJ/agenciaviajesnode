// Se imports express
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

//Funcion que permite ejecutar express
const app = express();


// Conectar a la base de datos
db.authenticate()
.then(() => console.log('Base de datos conectada'))
.catch(error => console.log(error));




//definir ppuerto
const port = process.env.PORT || 4000;

//habilitar pug 
app.set('view engine', 'pug');

// Obtener el anno actual
app.use((req, res, next)=> {

    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";

    return next();
});

//Agregar body parser para leer datos del formulario
app.use(express.urlencoded({extended: true}));

//definri la carpeta publica
app.use(express.static('public'));

//agregar erl router
//use soporta tods los verbos http
app.use('/',router);

//Arrancar el servidor con el metodo listen
app.listen (port,()=> {

    console.log(`Server is running on port ${port}`);
})
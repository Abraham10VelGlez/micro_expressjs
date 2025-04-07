const express = require('express') // modulo de expressjs
const helmet = require('helmet'); // modulo de seguridad de  encabezados HTTP relacionados con la seguridad
const port = 3000 //puerto default puede cambiar
const apphtml = require('path') //modulo de carga  html paara expres
const bodyParser = require('body-parser')//uso para peticiones
const cors = require('cors'); // Importar cors
const app = express() /// constante de la app

const jwt = require('jsonwebtoken')
require('dotenv').config();

const cookieParser = require('cookie-parser');

// Usar Helmet para establecer encabezados de seguridad
app.use(helmet());


const allowedOrigins = ['http://localhost:5175'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

// ⚠️ Esto es clave para responder correctamente al preflight
app.options('*', cors());



app.use(cookieParser());


// Middleware para parsear JSON
app.use(bodyParser.json());
//debes usar este cors PARA PODER HACER PETICIONES CUANDO MEZLCAR REACTJS + EXPRESSJS
// Middleware para parsear datos de formulario (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// rutas de prueba 1
app.get('/jwt', async function (req, res) {

    const userrname = "abraham";
    const passwordd = "abra122025";

    //validacion de json web token  INICIO
    const tokenuser = {
        users: userrname,
        pass: passwordd,
        namesys: 'AVGStudioA',
    }
    //arrancamos la libreria de jwt para validar y crear nuesttro token
    // usando el json de los datos del (usuario logeado , llave secreta de nuevo archivo env
    const token_ = jwt.sign(tokenuser, process.env.JWT_SECRET_KEY/*, { expiresIn: '5m' } or { expiresIn: '1h' }*/)
    // Comparar la contraseña proporcionada con el hash almacenado    
    res.cookie("jwt_avg", token_);
    //res.cookie("jsonavg", tokecredenciales);
    res.status(200).json({
        ok: true,
        message: 'Usuario correcto, continuar',
        data: token_
    }); // message client
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6ImFicmFoYW0iLCJwYXNzIjoiYWJyYTEyMjAyNSIsIm5hbWVzeXMiOiJBVkdTdHVkaW9BIiwiaWF0IjoxNzIzMDQ4ODcxfQ.31GiYuKRpehOOIppS09hu7A_PDrbl96jNbb3-Tm3FXY
});
// rutas de prueba 2
app.post('/login', function (req, res) {
    console.log("logeox");
    res.json({ message: "logeox" });
    //console.log(functionvalidatio_connection_postgres);
});




app.listen(port, () => {
    console.log(`EJEMPLO DE APP ESCUCHANDO AL PUERTO de CONEXION ${port}`);
})
const express = require('express') // modulo de expressjs
const helmet = require('helmet'); // modulo de seguridad de  encabezados HTTP relacionados con la seguridad
const port = 3000 //puerto default puede cambiar
const bodyParser = require('body-parser')//uso para peticiones
const cors = require('cors'); // Importar cors
const app = express() /// constante de la app

const jwt = require('jsonwebtoken')
require('dotenv').config();

const cookieParser = require('cookie-parser');

// Usar Helmet para establecer encabezados de seguridad
app.use(helmet());


const allowedOrigins = ['http://localhost:5173'];

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

// validacion de token
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
// logeo
app.post('/login', async (req, res) => {
    let { userrname, passwordd } = req.body.values;
    ///validacion interna en base de datos
    // const result = await fn_flag_validacion_especial(userrname, passwordd);
    //console.log(result);
    if (!userrname || !passwordd) {
        return res.status(200).json({ ok: 0 });
    }
    //convertir un char a number
    const userRole = 1;
    const nameuser = "Peter Benjamin Parker";
    //validacion de json web token  INICIO
    const tokenuser = {
        key: 340,
        rol: userRole,
        users: nameuser,
        // pass: passwordd,
        namesys: 'Abram33$5AVGt4sys',
    }
    // usando el json de los datos del (usuario logeado , llave secreta de nuevo archivo env
    const token_ = jwt.sign(tokenuser, process.env.JWT_SECRET_KEY, { expiresIn: '25m' })
    //const token_ = jwt.sign(tokenuser, process.env.JWT_SECRET_KEY, { expiresIn: '5m' })
    //validacion de json web token  FIN
    res.cookie("jwt_avg", token_);

    res.status(200).json({ ok: true, tokenx: token_ });
});
// salir de la apliacaion o cerrar session
app.post('/logout', async (req, res) => {
    res.clearCookie('jwt_avg');
    res.status(200).json({ ok: true, key: 1 });
})

//validacion de session
app.get('/tokens', async (req, res) => {
    if (!token_jsonweb) {
        // Token no existe o es undefined/null
        res.clearCookie('jwt_avg');
        json_response.push({ ok: false, key: 0 });
        await res.status(200).json({ ok: false })
    }

    try {

        const token_jsonweb = token_?.cookies?.jwt_avg;
        await jwt.verify(token_jsonweb, process.env.JWT_SECRET_KEY);
        await res.status(200).json({ ok: true })

    } catch {
        res.clearCookie('jwt_avg');
        await res.status(200).json({ ok: false })
    }
})

app.listen(port, () => {
    console.log(`EJEMPLO DE APP ESCUCHANDO AL PUERTO de CONEXION ${port}`);
})
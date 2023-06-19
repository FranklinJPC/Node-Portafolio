const express = require('express')
const {engine} = require('express-handlebars')
const methodOverride = require('method-override');
const session = require('express-session');
const fileUpload = require('express-fileupload')

// Inicializaciones
const path = require('path')
const app = express()
const passport = require('passport')
require('./config/passport')


// Configuraciones
// Variable que toma el puerto a la cual se desplega o la especificada (3003)
app.set('port', process.env.port || 3003) // Como una variable local
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', engine({
    defaultLayout: 'main',  // Layout principal
    layoutsDir:path.join(app.get('views'), 'layouts'), // Directorio principal
    partialsDir:path.join(app.get('views'), 'partials'), // Directorio de partials/componentes
    extname:'.hbs' // Extesion de las plantillas
}))
app.set('view engine', '.hbs')
// Configuracion de express-fileupload
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));

//app.use(require('./routers/index.routes'))

// Middleware
// Apis: express.json()
// Formularios: express.urlencode()
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method')) // Permite manejar los metodos http
// Crecion de la KEY para el servidor - "secret" <- una varible
app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
// Inicializa passport
app.use(passport.initialize())
// Inicializa session
app.use(passport.session())


// Variables globales
app.use((req,res,next)=>{
    res.locals.user = req.user?.name || null
    // console.log("-------------->", res.locals.user)
    next()
})

// Rutas
app.use(require('./routers/index.routes')) 
app.use(require('./routers/portafolio.routes'))
app.use(require('./routers/user.routes'))
// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))



module.exports = app

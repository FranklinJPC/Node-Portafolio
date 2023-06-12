const express = require('express')
const path = require('path')
const {engine} = require('express-handlebars')
const app = express()
const methodOverride = require('method-override');

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
//app.use(require('./routers/index.routes'))

// Middleware
// Apis: express.json()
// Formularios: express.urlencode()
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method')) // Permite manejar los metodos http

// Variables globales


// Rutas
app.use(require('./routers/index.routes')) 
app.use(require('./routers/portafolio.routes'))
// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))



module.exports = app

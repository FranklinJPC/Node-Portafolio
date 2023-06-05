const express = require('express')
const path = require('path')
const {engine} = require('express-handlebars')
const app = express()

// Configuraciones
// Variable que toma el puerto a la cual se desplega o la especificada (3003)
app.set('port', process.env.port || 3003) 
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

// Variables globales


// Rutas
app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/login',(req,res)=>{
    res.render('login')
})
// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))


module.exports = app

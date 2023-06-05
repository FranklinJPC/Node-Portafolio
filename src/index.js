const app = require('./server.js')
require('dotenv').config

app.listen(app.get('port'),()=>{
    console.log(`Servidor iniciado en ${app.get('port')}`);
})

const connection = require('./database.js')
connection()
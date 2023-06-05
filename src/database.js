const mongosoe = require('mongoose')
const MONGODB_URL = 'mongodb://0.0.0.0:27017/portafolio'

connection = async()=>{
    try{
        await mongosoe.connect(MONGODB_URL,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("Base de datos conectada")
    }
    catch(error){
        console.log(error)
    }
}

module.exports = connection
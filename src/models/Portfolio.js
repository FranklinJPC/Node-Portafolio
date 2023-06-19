const {Schema, model} = require('mongoose')

// Esquema
const portafolioSchema = new Schema(
    {
        title:{
            type: String,
            require: true
        },
        description:{
            type: String,
            require: true
        },
        category:{
            type: String,
            require: true
        },
        image:{
            public_id:String,
            secure_url:String
        },
        // Subdocumento
        // Se asocia un usuario
        // De cierta manera se trata de una relacion 1:n
        user:{
            type:String,
            required: true
        }
    },
    {
        timestamps:true // Registro de actualziacion, creacion.....
    }
)

module.exports = model('portafolio', portafolioSchema)
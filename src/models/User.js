const {Schema, model} = require('mongoose')
// Modulo de hash code
const bcrypt = require('bcryptjs') 

const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password :{
        type:String,
        require:true
    }
},{
    timestamps:true
})

// Instancias metodos
// Método para cifrar el password del usuario
userSchema.methods.encrypPassword = async (password)=>{
    // Saltos #de caracteres - default 10
    const salt = await bcrypt.genSalt(10)
    // Encripta el dato
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
userSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

// Coleccion y esquema asociado
module.exports = model('user',userSchema)
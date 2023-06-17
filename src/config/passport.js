// Importacion del PASSPORT
const passport = require('passport')
// Importar el modelo del Usuario
const User = require('../models/User')
// Define la estrategia 
const LocalStrategy = require('passport-local').Strategy


// Configuracion de la estrategia 
passport.use(new LocalStrategy({
    // Debe ser igual a aquellos que se encuentran en la vista del formulario Login
    usernameField:'email',
    passwordField:'password'
},async(email,password,done)=>{

    // Veriica el usuario en base al email
    const userBDD = await User.findOne({email})
    // Validad si el usuario se encuentra registrado
    // done(mensaje, aprobado/reprobado)
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
    // Validacion de las contraseñas mediante el metodo del modelo
    const passwordUser = await userBDD.matchPassword(password)
    // Valida que la contraseña sea correcta
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    // Retorna el usuario autentificadod
    return done(null,userBDD)
}))


// Serecializacion del usuario
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

// Deserializa el usuario
passport.deserializeUser(async (id, done) => {
    // Traer el usuario en base al id de la session
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});
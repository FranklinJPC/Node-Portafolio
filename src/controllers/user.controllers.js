// Importa el modelo
const User = require('../models/User')
// Importa el passport
const passport = require("passport")
// Importar metodo del nodemailer
const { sendMailToUser } = require("../config/nodemailer")

// Renderiza la vista del formulario
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}
// Ca´tura los datos y los guarda en la BD
const registerNewUser =async(req,res)=>{
    // Desestrcuturar los datos del formulario
    const{name,email,password,confirmpassword} = req.body
    // Verifica si los campos del formulario se encuentran completos
    // Includes: Verifica los valores que se manden como parametro
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    // Valida las contraseñas
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")

    // Traer el usuario en base al email
    const userBDD = await User.findOne({email})
    // Verifica en base al email si dicho usuario ya se encuentra registrado
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    // Se crea el registro para la base de datos en base a los campos
    const newUser = await new User({name,email,password,confirmpassword})
    // Encripta la contraseña para ser enviada a la BD
    newUser.password = await newUser.encrypPassword(password)
    // Se crea un token por defecto
    const token = newUser.crearToken()
    // Envia la confirmacion al email registrado
    sendMailToUser(email, token)
    // Guarda el nuevo usuario en la BD
    newUser.save()
    // Redirige al login 
    res.redirect('/user/login')
    // res.send('register new user')
}
// Renderiza la vista del formulario
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}
// Captura de datos del formulario
const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
})
// const loginUser =(req,res)=>{
//     res.send('login user')
// }
// Datos al cerrar la sesion
const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}
// Metodo para la confirmacion del email
const confirmEmail = async(req,res)=>{
    // Valida el toekn del usuario
    if(!(req.params.token)) return res.send("Lo sentimos, no se puede validar la cuenta")
    // Carga el usuario en base al token enviado
    const userBDD = await User.findOne({token:req.params.token})
    // Stea el token a null
    userBDD.token = null
    // Camabia la confirmacion de email a true
    userBDD.confirmEmail=true
    // Guarda el usuario
    await userBDD.save()
    // Envio del mensaje de respuesta
    res.send('Token confirmado, ya puedes iniciar sesión');
}


module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser,
    confirmEmail
}
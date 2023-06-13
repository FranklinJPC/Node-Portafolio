// Importa el modelo
const User = require('../models/User')
// Importa el passport
const passport = require("passport")

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


module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser
}
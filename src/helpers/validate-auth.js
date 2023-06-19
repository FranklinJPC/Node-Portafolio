// Proteccion de rutas
// Exportacion de la funcion isAuteticate
// - Funcion para la validadción para rutas que solo funcionan con un usuario atenticado
module.exports.isAuthenticated = (req,res,next)=>{
    // Validacion
    if(req.isAuthenticated()){
        // Continua a las demas rutas
        return next()
    }
    // Caso contrario se redirecciona a la pagina principal.
    res.redirect('/user/login')
}
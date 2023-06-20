// Invoca la funcion ROUTE
const {Router} = require('express')
// Invoca las funciones del controlador
const { renderRegisterForm, registerNewUser, renderLoginForm, loginUser, logoutUser, confirmEmail } = require('../controllers/user.controllers')
// Inicializa la funcion en una variable
const router = Router()

// Define las rutas

router.get('/user/register',renderRegisterForm)
router.post('/user/register',registerNewUser)


router.get('/user/login',renderLoginForm)
router.post('/user/login',loginUser)


router.post('/user/logout',logoutUser)

router.get('/user/confirmar/:token',confirmEmail)

// Exportacion por default
module.exports =router
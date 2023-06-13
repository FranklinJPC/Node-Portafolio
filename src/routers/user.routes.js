// Invoca la funcion ROUTE
const {Router} = require('express')
// Invoca las funciones del controlador
const { renderRegisterForm, registerNewUser, renderLoginForm, loginUser, logoutUser } = require('../controllers/user.controllers')
// Inicializa la funcion en una variable
const router = Router()

// Define las rutas

router.get('/user/register',renderRegisterForm)
router.post('/user/register',registerNewUser)


router.get('/user/login',renderLoginForm)
router.post('/user/login',loginUser)


router.post('/user/logout',logoutUser)

// Exportacion por default
module.exports =router
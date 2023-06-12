// Instancia el modelo
const Portfolio = require('../models/Portfolio')

// Metodos del portafolio
const renderAllPortafolios = async (req,res)=>{
    // A partir del modelo se utiliza el meotod find() y lean().
    const portfolios = await Portfolio.find().lean()
    // Invoca la visa y pasa las variables al portalfolio
    res.render("portafolio/allPortfolios",{portfolios})
    // res.send('Listar todos los portafolios')
}

const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}
// Presentar el formulario
const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}
// Capturar el formulario
const createNewPortafolio = async (req,res)=>{
    // Desestructurar
    const {title, category,description} = req.body
    // Creacion de una nueva instancia
    const newPortfolio = new Portfolio({title,category,description})
    // Ejecuta el metodo save()
    await newPortfolio.save() // Parte del metodo overrride
    res.redirect('/portafolios') // Redirecciona la pagina para otra
    // res.json({newPortfolio})
    console.log(req.body)
}
const renderEditPortafolioForm = async (req,res)=>{
    // A partir del modelo se llama al metodo findByid
    // Encuentra el portafolio en base al request params el ID
    const portfolio = await Portfolio.findById(req.params.id).lean()
    // Envia los datos editados 
    res.render('portafolio/editPortfolio',{portfolio})
    // res.send('Formulario para editar un portafolio')
}
const updatePortafolio = async(req,res)=>{
    // Captura de datos del form
    const {title,category,description}= req.body
    // A partir del modelo se llama al meotod findByIdAndUpdate
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    // Redirecciona
    res.redirect('/portafolios')
    // res.send('Editar un portafolio')
}
const deletePortafolio = async (req,res)=>{
    // Usa el metodo delete a partir del modelo
    await Portfolio.findByIdAndDelete(req.params.id)
    // Redirecciona
    res.redirect('/portafolios')
    // res.send('Eliminar un nuevo portafolio')
}



module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}
// Instancia el modelo
const Portfolio = require('../models/Portfolio')
// Instancia para la subida de imagenes
const { uploadImage, deleteImage } = require('../config/cloudinary')
const fs = require('fs-extra')

// Metodos del portafolio
const renderAllPortafolios = async (req,res)=>{
    // A partir del modelo se utiliza el meotod find() y lean().
    // const portfolios = await Portfolio.find().lean()
    // Traer unicamente los documentos que este relacionado al usuario logeado
    const portfolios = await Portfolio.find({user:req.user._id}).lean()
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
    // Se asocia los subdocumentos al usuario logeado
    newPortfolio.user = req.user._id // req.user._id -> forma parte de la sesion
    // Validacion de una imagen 
    if(!(req.files?.image)) return res.send("Se requiere una imagen")
    // Trae los datos de la imagen 
    const imageUpload = await uploadImage(req.files.image.tempFilePath)
    newPortfolio.image = {
        // Datos de la imagen enviadas como propiedades
        public_id:imageUpload.public_id,
        secure_url:imageUpload.secure_url
    }
    // Sube la imagen mediante el metodo uploadimage
    // await uploadImage(req.files.image.tempFilePath)
    // La imagen es eliminada del upload
    await fs.unlink(req.files.image.tempFilePath)
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
    // Validación de que unicamente el usuario logeado sea capaz de actualizar
    const portfolio = await Portfolio.findById(req.params.id).lean()
    // if(portfolio.user.toString() !== req.user._id.toString()) return res.redirect('/portafolios')
    // // Captura de datos del form
    // const {title,category,description}= req.body
    // // A partir del modelo se llama al meotod findByIdAndUpdate
    // await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    
    //Valida la id del portafolio   
    if(portfolio._id != req.params.id) return res.redirect('/portafolios')
    
    // Valida si existe una imagen nueva
    if(req.files?.image) {
        // Valida se agrega algo vacio
        if(!(req.files?.image)) return res.send("Se requiere una imagen")
        // Sobreescribe la imagen
        await deleteImage(portfolio.image.public_id)
        const imageUpload = await uploadImage(req.files.image.tempFilePath)
        // Sobreescribe los datos del portafolio
        const data ={
            title:req.body.title || portfolio.name,
            category: req.body.category || portfolio.category,
            description:req.body.description || portfolio.description,
            image : {
            public_id:imageUpload.public_id,
            secure_url:imageUpload.secure_url
            }
        }
        // Realiza la limpieza de temporales
        await fs.unlink(req.files.image.tempFilePath)
        await Portfolio.findByIdAndUpdate(req.params.id,data)
    }
    else{
        // Realiza la actualizacion 
        const {title,category,description}= req.body
        await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    }
    // Redirige a portafolios
    res.redirect('/portafolios')
    // res.send('Editar un portafolio')
}
const deletePortafolio = async (req,res)=>{
    // Usa el metodo delete a partir del modelo
    const portafolio = await Portfolio.findByIdAndDelete(req.params.id)
    await deleteImage(portafolio.image.public_id)
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
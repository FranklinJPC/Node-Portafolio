// Importacion del modulo
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
// Configuraciones del servidor SMT
const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP
    }
})


// send mail with defined transport object
// Define la estrcutura del correo electronico
module.exports.sendMailToUser = async(userMail,token)=>{
    // Borrar para el taller....
    // console.log(token);
    // Cuerpo del email
    let info = await transporter.sendMail({
    // De:
    from: 'admin@esfot.com',
    // Para quien:
    to: userMail,
    // Asunto
    subject: "Verifica tu cuenta de correo electrónico",
    // Cuerpo del email
    // Veriica mediante una ruta de envio 
    html: `<a href="http://localhost:3000/user/confirmar/${token}">Clic para confirmar tu cuenta</a>`,
    });
    console.log("Message sent: %s", info.messageId);
}
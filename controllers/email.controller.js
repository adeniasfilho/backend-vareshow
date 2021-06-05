const nodemailer = require("nodemailer");
const smtTransport = require("nodemailer-smtp-transport");

function sendEmail(req, res) {
    const name = req.sanitize("name").escape();
    const email = req.sanitize("email").escape();
    
    const subject = req.sanitize("subject").escape();
    req.checkBody("name", "Insira apenas texto", "pt-PT")
    .matches(/^ [a-z] +$/i);
    req.checkBody("email", "Insira um email válido.") 
    .isEmail();

    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (typeof(email) !="undefined" && typeof(subject) !="undefined" &&
            typeof(name) !="undefined") {
                const bodycontent = " ";
                bodycontent += "Caro " + req.body.name + ", <br>" + "<br>";
                bodycontent += "Agradecemos o seu contato!" + "<b>" + "Obrigado" +
                    "<b>" + "<b>";
                bodycontent += "Mensagem enviada: <blockquote><i>";
                bodycontent += req.body.subject + "<br>" + "<br>" + 
                    "mensagem enviada por " + req.body.name;
                bodycontent += ' com o email <a href="emailto: ' + req.body.email + ' "target="_top">' +
                    req.body.name + '</a>';
                bodycontent += '</i></blockquote>';
                bodycontent += '<img src="https://vareshow.serverapp.com/assets/images/email.png +" '
                                          '+ alt="email.icon" height="42" width="42">';
                                          console.log(bodycontent);
        }
        const transporter = nodemailer.createTransport(smtTransport({
            service: 'Gmail',
            auth: {
                user: "vareshowemail",
                pass: "password"
            },
            service: 'icloud',
            auth: {
                user: "vareshowicloud",
                pass: "password"
            }
        }));
        transporter.verify((error, success) => {
            if (error) {
                console.log(error);
                res.status(jsonMessages.email.serverError.status)
                   .send(jsonMessages.email.serverError);
            }
            else {
                console.log("Servidor está lendo nossas mensagens.");
            }
        });
        const emailOptions = [
            {
            from: req.body.email,
            to: "vareshowemail@gmail.com",
            cc: req.body.email,
            subject: "Vareshow - site contact",
            html: bodycontent
            },
            {
            from: req.body.email,
            to: "vareshowemail@icloud.com",
            cc: req.body.email,
            subject: "Vareshow - site contact",
            html: bodycontent
            }
        ]
        transporter.sendEmail(emailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(jsonMessages.email.emailError.status)
                .send(jsonMessages.email.emailError);
            }
            else {
                console.log("Email sent: " + info.response);
                res.status(jsonMessages.email.emailSent.status)
                .send(jsonMessages.email.emailSent);
            }
        });
    }
    res.status(jsonMessages.email.requiredData.status)
           .send(jsonMessages.email.requiredData);
    
}




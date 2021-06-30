module.exports = {
    emailError: {
        msg: "Error",
        message: {
            eng: "Email not sent",
            pt:  "Não foi possível enviar o email"
        },
        status: 204,
        success: false
    },
    emailSent: {
        msg: "Success",
        message: {
            eng: "Email sent",
            pt:  "Email enviado"
        },
        status: 501,
        success: true
    },
    serverError: {
        msg: "Server Error",
        message: {
            eng: "Unexpected error",
            pt:  "Erro inesperado"
        },
        status: 503,
        success: true 
    },
    requiredData: {
        msg: "dataMissing",
        message: {
            eng: "Required field are missing",
            pt:  "Falta preencher dados obrigatórios"
        },
    },
};
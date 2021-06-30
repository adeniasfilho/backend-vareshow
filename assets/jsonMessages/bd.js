module.exports = {
    user: {
        duplicate: {
            msg: "DuplicateValues",
            message: {
                eng: "Email already registred",
                pt: "O seu email já está registrado"
            },
            status: 409,
            success: false
        },
        invalid: {
            msg: "Invalid",
            message: {
                eng: "Invalid Login",
                pt: "Os dados inseridos são válidos"
            },
            status: 400,
            success: false
        },
        unauthorized: {
            msg: "unauthorized",
            message: {
                eng: "You cannot access to this route",
                pt: "Não há privilégios para aceder esta rota"
            },
            status: 400,
            success: false
        },
        email: {
            msg: "Invalid",
            message: {
                eng: "Invalid Email",
                pt: "O email inserido não está registrado"
            },
            status: 400,
            success: false
        },
        password: {
            msg: "Invalid",
            message: {
                eng: "Invalid password",
                pt: "Senha inválida"
            },
            status: 400,
            success: false
        },
        signinSuccess: {
            msg: "Success",
            message: {
                eng: "Login with success",
                pt: "Login com sucesso"
            },
            status: 200,
            success: true
        },
        signupSuccess: {
            msg: "Signup Success",
            message: {
                eng: "Signup with success",
                pt: "Registro efetuado com sucesso"
            },
            status: 200,
            success: true
        },
        logoutSuccess: {
            msg: "Logout Success",
            message: {
                eng: "Logout with success",
                pt: "Sessão finalizada com sucesso"
            },
            status: 200,
            success: true
        },

        logoutError: {
            msg: "Logout Error",
            message: {
                eng: "You can't logout. There is no active session",
                pt: "Não pode finalizar a sessão. Não há nenhuma sessão ativa."
            },
            status: 400,
            success: false
        },
        error: {
            msg: "Error",
            message: {
                eng: "Something went wrong with your Signin",
                pt: "Algo de errado aconteceu no processo de login"
            },
            status: 503,
            success: true
        },
    }
};
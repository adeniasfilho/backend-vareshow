const connect = require("../configBD/connectMySQL");
const jsonMessagesPath = __dirname + "/../assets/jsonMessages";
const jsonMessages = require(jsonMessagesPath + "bd");

function readCliente(req, res) {
    const idCliente = req.sanitize("idcliente").escape();
    const nome = req.sanitize("nome").escape();
    const cpf = req.sanitize("cpf").escape();
    const telefone = req.sanitize("telefone").escape();
    const email = req.sanitize("email").escape();
    const lojista = req.sanitize("lojista").escape();
    const idCesta = req.sanitize("idCesta").escape();
    const post = {
        idCliente: idCliente,
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        email: email,
        idLojista: idLojista,
        idCesta: idCesta
    };
    const query = connect.con.query("SELECT idCliente FROM cdstr_cliente where ?  +",
        "+ order by idCliente desc", post, (err, rows, fields) => {
            console.log(query.sql);
            if (err) {
                res.status(jsonMessages.db.dbError.status)
                    .send(jsonMessages.db.dbError);
            } else {

                if (rows.length == 0) {
                    res.status(jsonMessages.db.noRecords.status)
                        .send(jsonMessages.db.noRecords);
                } else {
                    res.send(rows);
                }
            }
        });
}

function saveCliente(req, res) {
    const idCliente = req.sanitize("idCliente").escape();
    const nome = req.sanitize("nome").escape();
    const cpf = req.sanitize("cpf").escape();
    const telefone = req.sanitize("telefone").escape();
    const email = req.sanitize("email").escape();
    const idLojista = req.sanitize("lojista").escape();
    const idCesta = req.sanitize("idCesta").escape();
    const checkParams = req.checkParams("idCliente", "Insira um email válido.").isEmail();

    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    } else {
        const idCliente = req.params.idCliente;
        const nome = req.params.nome;
        const cpf = req.params.cpf;
        const telefone = req.params.telefone;
        const email = req.params.email;
        const idLojista = req.params.lojista;
        const idCesta = req.params.idCesta;


        if (idCliente != "NULL" && idCesta != "NULL" && typeof (idCliente) != "undefined" &&
            typeof (idCesta) != "undefined") {
            const post = {
                idCliente: idCliente,
                nome: nome,
                cpf: cpf,
                telefone: telefone,
                email: email,
                idLojista: idLojista,
                idCesta: idCesta
            };
            const query = connect.con.query("INSERT INTO cliente SET ? ",
                post, (err, rows, fields) => {
                    if (!err) {
                        res.status(jsonMessages.db.successInsert.status)
                            .send(jsonMessages.db.successInsert);
                    } else {
                        console.log(err);
                        if (err.code == "ERR_DUPLICADO_ENTRY") {
                            res.status(jsonMessages.db.duplicateNome);
                        } else {
                            res.status(jsonMessages.db.dbError.status)
                                .send(jsonMessages.db.dbError);
                        }
                    }
                });

        } else {
            res.status(jsonMessages.db.requireData.status)
                .send(jsonMessages.db.requireData);
        }
    }
}

function deleteCliente(req, res) {
    const idCliente = req.sanitize("idCliente").escape();
    const idCesta = req.sanitize("idCesta").escape();
    const params = [idCliente, idCesta];
    const query = connect.con.query("DELETE FROM cliente WHERE idCesta = ? AND idCesta = ?",
        params, (err, rows, fields) => {
            console.log(query.sql);
            if (!err) {
                res.status(200).json(cliente);

            } else {
                res.status(jsonMessages.db.errDelete.status)
                    .send(jsonMessages.db.errDelete);
            }
        })
}
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");
const exports = (module.exports = {});

function readPagamento(req, res) {
    const idCesta = req.sanitize("idCesta").escape();
    const idLojista = req.sanitize("idLojista").escape();
    const idCliente = req.sanitize("idCliente").escape();
    const status = req.sanitize("status").escape();
    const data_hora = req.sanitize("data_hora").escape();
    const forma_de_pagamento = req.sanitize("forma_de_pagamento").escape();
    const post = {
        idPagamento: idPagamento,
        idCesta: idCesta,
        idLojista: idLojista,
        idCliente: idCliente,
        status: status,
        data_hora: data_hora,
        forma_de_pagamento: forma_de_pagamento

    };
    const query = connect.con.query(
        "SELECT idPagamento, data_hora, status + ",
        " + forma_de_pagamento FROM status where ? order by idPagamento desc",
        post,
        (err, rows, fields) => {
            console.log(query.sql);
            if (err) {
                console.log(err);
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
};

function savePagamento(req, res) {
    const idPagamento = req.sanitize("idPagamento").escape();
    const idCesta = req.sanitize("idCesta").escape();
    const idLojista = req.sanitize("idLojista").escape();
    const idCliente = req.sanitize("idCliente").escape();
    const status = req.sanitize("status").escape();
    const data_hora = req.sanitize("data_hora").escape();
    const forma_de_pagamento = req.sanitize("forma_de_pagamento").escape();
    const idPagamento = req.checkParams("idPagamento", "insira um email válido para confirmar o pagamento.")
        .isEmail();
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    } else {
        const idPagamento = req.params.idPagamento;
        const idCesta = req.params.idCesta;
        const idLojista = req.params.idLojista;
        const idCliente = req.params.idCliente;
        const status = req.params.status;
        const data_hora = req.params.data_hora;
        const forma_de_pagamento = req.params.forma_de_pagamento;

        if (idPagamento != "NULL" && idCesta != "NULL" &&
            typeof (idPagamento) != "undefined" && typeof (idPagamento) != "undefined") {
            const post = {
                idPagamento: idPagamento,
                idCesta: idCesta,
                idLojista: idLojista,
                idCliente: idCliente,
                status: status,
                data_hora: data_hora,
                forma_de_pagamento: forma_de_pagamento

            };
            const query = connect.con.query("INSERT INTO idPagamento SET ?", post,
                (err, rows, fields) => {
                    console.log(query.sql);
                    if (!err) {
                        res.status(jsonMessages.db.successInsert.status)
                            .send(jsonMessages.db.successInsert);
                    } else {
                        console.log(err);
                        if (err.code == "ERR_DUPLICADO_ENTRY") {
                            res.status(jsonMessages.db.duplicateEmail.status)
                                .send(jsonMessages.db.duplicateEmail);
                        } else {
                            res.status(jsonMessages.db.dbError.status)
                                .send(jsonMessages.db.dbError);
                        }
                    }
                });
        } else {
            res.status(jsonMessages.db.requireData.status).send(jsonMessages.db.requireData);
        }
    }
}

function deletePagamento(req, res) {
    const idPedido = req.sanitize("idPedido").escape();
    const idCliente = req.sanitize("idCliente").escape();
    const params = [idPedido, idCliente];
    const query = connect.con.query("DELETE FROM pagamento WHERE idPedido = ? AND idCliente = ?",
        params, (err, rows, fields) => {
            console.log(query.sql);
            if (!err) {
                res.status(200).json(pagamento);

            } else {
                res.status(jsonMessages.db.errDelete.status)
                    .send(jsonMessages.db.errDelete);
            }
        })
}
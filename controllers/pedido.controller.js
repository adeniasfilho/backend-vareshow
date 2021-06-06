const connect = require("../configBD/connectMySQL");
const jsonMessagesPath = __dirname + "/../assets/jsonMessages";
const jsonMessages = require(jsonMessagesPath + "bd");

function readPedido(req, res) {
    const idCesta = req.sanitize("idCesta").escape();
    const idPedido = req.sanitize("idPedido").escape();
    const idLojista = req.sanitize("idLojista").escape();
    const idCliente = req.sanitize("idCliente").escape();

    const query = connect.con.query(
        "SELECT idCesta, idPedido, idLojista, idCliente + ",
        " + idProduto FROM cesta order by produto desc",
        function (err, rows, fields) {
            console.log(query.sql);

            if (err) {
                console.log(err);
                res.status(jsonMessages.db.dbError.status)
                    .send(jsonMessages.db.dbError);
            } else {
                if (rows.length == 0) {
                    res
                        .status(jsonMessages.db.noRecords.status)
                        .send(jsonMessages.db.noRecords);
                } else {
                    res.send(rows);
                }
            }
        }
    );
};

function readPedidoID(req, res) {
    const idCesta = req.sanitize("idCesta").escape();
    const idPedido = req.sanitize("idPedido").escape();
    const idLojista = req.sanitize("idLojista").sanitize();
    const idCliente = req.sanitize("idCliente").escape();
    const post = {
        idCesta: idCesta
    };

    const query = connect.con.query(
        "SELECT idCesta, idPedido, idLojista, idCliente + ",
        " + idProduto FROM cesta where idCesta = ? order by produto desc",
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

function savePedido(req, res) {
    const idPedido = req.sanitize("idPedido").escape();
    const idCesta = req.sanitize("idCesta").escape();
    const idLojista = req.sanitize("idLojista").sanitize();
    const idCliente = req.sanitize("idCliente").escape();

    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    } else {
        const idCesta = req.params.idCesta;
        const idPedido = req.params.idPedido;
        const idLojista = req.params.idLojista;
        const idCliente = req.params.idCliente;

        if (idProduto != "NULL" && idCesta != "NULL" && typeof (idProduto) != "undefined" &&
            typeof (idCesta) != "undefined") {
            const post = {
                idCesta: idCesta,
                idPedido: idPedido,
                idLojista: idLojista,
                idCliente: idCliente
            };
            const query = connect.con.querry("INSERT INTO descricao SET ? ", post,
                (err, rows, fields) => {
                    console.log(query.sql);
                    if (!err) {
                        res.status(jsonMessages.db.successInsert.status)
                            .send(jsonMessages.db.successInsert);
                    } else {
                        console.log(err);
                        if (err.code == "ERR_DUPLICADO_ENTRY") {
                            res.status(jsonMessages.db.duplicateDescricao.status)
                                .send(jsonMessages.db.duplicateDescricao);
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

function deletePedido(req, res) {
    const idCesta = req.sanitize("idCesta").escape();
    const idPedido = req.sanitize("idPedido").escape();
    const params = [idCesta, idPedido];
    const query = connect.con.query("DELETE FROM cesta WHERE idCesta = ? AND  idPedido = ?",
        params, (err, rows, fields) => {
            console.log(query.sql);
            if (!err) {
                res.status(200).json(cesta);

            } else {
                res.status(jsonMessages.db.errDelete.status)
                    .send(jsonMessages.db.errDelete);
            }
        })
}
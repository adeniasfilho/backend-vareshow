const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");
const exports = (module.exports = {});

exports.signup = function (req, res) {
    res
        .status(jsonMessages.user.duplicate.status)
        .send(jsonMessages.user.duplicate);
};
exports.signupSucess = function (req, res) {
    res
        .status(jsonMessages.user.signupSucess.status)
        .send(jsonMessages.user.signupSucess);
};
exports.signin = function (req, res) {
    res.status(jsonMessages.user.invalid.status).send(jsonMessages.user.invalid);
};
exports.signinSuccess = function (req, res) {
    res
        .status(jsonMessages.user.signinSuccess.status)
        .send(jsonMessages.user.signinSuccess);
};

exports.logout = function (req, res, err) {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res
                .status(jsonMessages.user.logoutError.status)
                .send(jsonMessages.user.logoutError);
        }
        res.status(jsonMessages.user.logoutSuccess.status)
            .send(jsonMessages.user.logoutSuccess);
    });
};

const connect = require("../configBD/connectMySQL");
const jsonMessagesPath = __dirname + "/../assets/jsonMessages";
const jsonMessages = require(jsonMessagesPath + "bd");

function readCdstrCesta(req, res) {
    const idCesta = req.sanitize("idCesta").escape();
    const idPedido = req.sanitize("idpedido").escape();
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

function readCestaID(req, res) {
        const idCesta = req.sanitize("idCesta").escape();
        const idPedido = req.sanitize("idPedido").escape();
        const idLojista = req.sanitize("idLojista").sanitize();
        const idCliente = req.sanitize("idCliente").escape();
        const post = { idCesta: idCesta };
        
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

function readPagamento(req, res) {
    const idCesta = req.sanitize("idCesta").escape();
    const idLojista = req.sanitize("idLojista").escape();
    const idCliente = req.sanitize("idCliente").escape();
    const status = req.sanitize("status").escape();
    const data_hora = req.sanitize("data_hora").escape();
    const forma_de_pagamento = req.sanitize("forma_de_pagamento").escape();
    const post = { idCesta: idCesta };
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

            const idPagamento = req.params.idCesta;
            const idCesta = req.params.idCesta;
            const idCliente = req.body.nomeCliente;

            if (idPagamento != "NULL" && idCesta != "NULL" &&
                typeof (idPagamento) != "undefined" && typeof (idPagamento) != "undefined") {
                const post = {
                    idPagamento: idPagamento,
                    idCesta: idCesta,
                    nomeCliente: nome
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

function readCdstrProduto(res, req) {
    const idProduto = req.sanitize("idproduto").escape();
    const idLojista = req.sanitize("idLojista").escape();
    const idCesta = req.sanitize("idCesta").escape();
    const nomeFantasia = req.sanitize("nomeFantasia").escape();
    const nome = req.sanitize("nome").escape();
    const quantidade = req.sanitize("quantidade").escape();
    const descricao = req.sanitize("descricao").escape();
    const preco = req.sanitize("preco").escape();
    const idCategoria = req.sanitize("idCategoria").escape();
    const idSubcategoria = req.sanitize("idSubcategoria").escape();

    const post = { idCesta: idCesta };
        const query = connect.con.query("SELECT idProduto, nome FROM cdstr_produto where ? order by +",
            "+ idProduto desc", post, (err, rows, fields) => {
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
}

function saveProduto(req, res) {
    const idLojista = req.sanitize("idLojista").escape();
    const idCesta = req.sanitize("idCesta").escape();
    const nomeFantasia = req.sanitize("nomeFantasia").escape();
    const nome = req.sanitize("nome").escape();
    const quantidade = req.sanitize("quantidade").escape();
    const descricao = req.sanitize("descricao").escape();
    const preco = req.sanitize("preco").escape();
    const idCategoria = req.sanitize("idCategoria").escape();
    const idSubcategoria = req.sanitize("idSubcategoria").escape();
    const idProduto = req.checkParams("idProduto", "Insira a descrição do produto e, categoria ou subcategoria")
            .isDescricao()
            .isCategoria();

    const errors = req.validationErrors();
        if (errors) {
            res.send(errors);
            return;
        } else {
            const idProduto = req.params.idProduto;
            const idCesta = req.params.idCesta;
            const nome = req.body.nomeFantasia;

            if (idProduto != "NULL" && idCesta != "NULL" && typeof (idProduto) != "undefined" &&
            typeof(idCesta) != "undefined") {
                const post = {
                    idProduto: idProduto,
                    idCesta: idCesta,
                    nomeFantasia: nome
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

function readCdstrCliente(req, res) {
    const idCliente = req.sanitize("idcliente").escape();
    const nome = req.sanitize("nome").escape();
    const cpf = req.sanitize("cpf").escape();
    const telefone = req.sanitize("telefone").escape();
    const email = req.sanitize("email").escape();
    const lojista = req.sanitize("lojista").escape();    
    const idCesta = req.sanitize("idCesta").escape();
    const post = { idCesta: idCesta, cdstr_cliente: nome };
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
    const lojista = req.sanitize("lojista").escape();
    const idCesta = req.sanitize("idCesta").escape();

    if (idCliente != "NULL" && idCesta != "NULL" && typeof(idCliente) != "undefined" &&
        typeof(idCesta) != "undefined") {
            const post = { idCliente: idCliente, idCesta: idCesta };
            const query = connect.con.query("INSERT INTO cdstr_cliente SET ? ",
               post, (err, rows, fields) => {
                   if (!err) {
                       res.status(jsonMessages.db.successInsert.status)
                       .send(jsonMessages.db.successInsert);
                   }
                   else {
                       console.log(err);
                       if (err.code == "ERR_DUPLICADO_ENTRY") {
                           res.status(jsonMessages.db.duplicateNome);
                       }
                       else {
                           res.status(jsonMessages.db.dbError.status)
                              .send(jsonMessages.db.dbError);
                       }
                   }
               });
    } 
    else {
            res.status(jsonMessages.db.requireData.status)
               .send(jsonMessages.db.requireData);
    }
}

function readCdstrLojista(req, res) {
    const cdstr_lojista = req.sanitize("cdstr_lojista").escape();
    const idLojista = req.sanitize("idLojista").escape();
    const cnpj = req.sanitize("cnpj").escape();
    const razaoSocial = req.sanitize("razaoSocial").escape();
    const nomeFantasia = req.sanitize("nomeFantasia").escape();
    const idCesta = req.sanitize("idCesta").escape();
    const post = { idCesta: idCesta, cadastro_lojista: cdstr_lojista };

    const query = connect.con.query("SELECT idLojista FROM cdstr_lojista where ? +",
    "+ order by idLojista desc", post, (err, rows, fields) => {
        console.log(query.sql);
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status)
                .send(jsonMessages.db.dbError);
        }
        else {
              if (rows.length == 0) {
                  res.status(jsonMessages.db.noRecords.status)
                  .send(jsonMessages.db.noRecords);
              }
              else {
                  res.send(rows);
              }
        }
    });
}
   





   
    
 


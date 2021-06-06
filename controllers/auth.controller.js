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
    const idPedido = req.sanitize("idPedido").escape();
    const idLojista = req.sanitize("idLojista").escape();
    const idCliente = req.sanitize("idCliente").escape();

    const post = {
        idCesta: idCesta,
        idPedido: idPedido,
        idLojista: idLojista,
        idCliente: idCliente
    };
    
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
        
        const post = {
            idCesta: idCesta,
            idPedido: idPedido,
            idLojista: idLojista,
            idCliente: idCliente
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

function readCdstrPagamento(req, res) {
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
};

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

    const post = {
        idProduto: idProduto,
        idLojista: idLojista,
        idCesta: idCesta,
        nome: nome,
        quantidade: quantidade,
        descricao: descricao,
        preco: preco,
        idCategoria: idCategoria,
        idSubcategoria: idSubcategoria
    };
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
};

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
                    idLojista: idLojista,
                    idCesta: idCesta,
                    nome: nome,
                    quantidade: quantidade,
                    descricao: descricao,
                    preco: preco,
                    idCategoria: idCategoria,
                    idSubcategoria: idSubcategoria
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
};

function readCdstrCliente(req, res) {
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
};

function saveCliente(req, res) {
    const idCliente = req.sanitize("idCliente").escape();
    const nome = req.sanitize("nome").escape();
    const cpf = req.sanitize("cpf").escape();
    const telefone = req.sanitize("telefone").escape();
    const email = req.sanitize("email").escape();
    const idLojista = req.sanitize("lojista").escape();
    const idCesta = req.sanitize("idCesta").escape();

    if (idCliente != "NULL" && idCesta != "NULL" && typeof(idCliente) != "undefined" &&
        typeof(idCesta) != "undefined") {
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
};

function readCdstrLojista(req, res) {
    const lojista = req.sanitize("lojista").escape();
    const idLojista = req.sanitize("idLojista").escape();
    const nome = req.sanitize("nome").escape();
    const email =  req.sanitize("email").escape();
    const telefone = req.sanitize("telefone").escape();
    const cnpj = req.sanitize("cnpj").escape();
    const razaoSocial = req.sanitize("razaoSocial").escape();
    const nomeFantasia = req.sanitize("nomeFantasia").escape();
    
    const post = {
        lojista: lojista,idLojista: idLojista, nome: nome, 
        email: email, 
        telefone: telefone, cnpj: cnpj, razaoSocial: razaoSocial,
        nomeFantasia: nomeFantasia
    };
    const query = connect.con.query("SELECT idLojista FROM lojista where ? +",
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
};

function saveLojista(req, res) {
    const lojista = req.sanitize("lojista").escape();
    const idLojista = req.sanitize("idLojista").escape();
    const nome = req.sanitize("nome").escape();
    const email =  req.sanitize("email").escape();
    const telefone = req.sanitize("telefone").escape();
    const cnpj = req.sanitize("cnpj").escape();
    const razaoSocial = req.sanitize("razaoSocial").escape();
    const nomeFantasia = req.sanitize("nomeFantasia").escape();
    
    req.checkParams("idLojista", "Insira um email válido.") .isEmail();

    if (idLojista != "NULL" && idCesta != "NULL" && typeof(idLojista) != "undefined" &&
    typeof(idCesta) != "undefined") {
        const post = {
            lojista: lojista, idLojista: idLojista, nome: nome, 
            email: email, 
            telefone: telefone, cnpj: cnpj, razaoSocial: razaoSocial,
            nomeFantasia: nomeFantasia
        };
        const query = connect.con.query("INSERT INTO lojista SET ?",
        post, (err, rows, fields) => {
            console.log(query.sql);
            if (!err) {
                res.status(jsonMessages.db.successInsert.status)
                   .send(jsonMessages.db.successInsert);
            }
            else {
                console.log(err);
                if (err.code == "ERR_DUPLICADO_ENTRY") {
                    res.status(jsonMessages.db.duplicateEmail.status)
                    .send(jsonMessages.db.dbError);
                }
            }
        });
    }
    else {
        res.status(jsonMessages.db.requireData.status)
           .send(jsonMessages.db.requireData);
    }
};

function deleteCesta(req, res) {
    const idCesta = req.sanitize("idCesta").escape();
    const idLojista = req.sanitize("idLojista").escape();
    const params = [idCesta, idLojista];
    const query = connect.con.query("DELETE FROM lojista WHERE idCesta = ? AND  idLojista = ?",
        params, (err, rows, fields) => {
            console.log(query.sql);
            if (!err) {
                res.status(200).json(cesta);
                   
            }
            else {
                res.status(jsonMessages.db.errDelete.status)
                   .send(jsonMessages.db.errDelete);
            }
        })
};

function deleteCliente(req, res) {
    const idCliente = req.sanitize("idCliente").escape();
    const idCesta = req.sanitize("idCesta").escape();
    const params = [idCliente, idCesta];
    const query = connect.con.query("DELETE FROM cliente WHERE idCesta = ? AND idCesta = ?",
        params, (err, rows, fields) => {
            console.log(query.sql);
            if (!err) {
                res.status(200).json(cliente);
                   
            }
            else {
                res.status(jsonMessages.db.errDelete.status)
                .send(jsonMessages.db.errDelete);
            }
        })
}

function deleteLojista(req, res) {
    const idLojista = req.sanitize("idLojista").escape();
    const idCesta = req.sanitize("idCesta").escape();
    const params = [idLojista, idCesta];
    const query = connect.con.query("DELETE FROM lojista WHERE idCesta = ? AND idCesta = ?",
        params, (err, rows, fields) => {
            console.log(query.sql);
            if (!err) {
                res.status(200).json(lojista);
                   
            }
            else {
                res.status(jsonMessages.db.errDelete.status)
                .send(jsonMessages.db.errDelete);
            }
        })
};

function deleteProduto(req, res) {
    const idProduto = req.sanitize("idProduto").escape();
    const idCesta = req.sanitize("idCesta").escape();
    const params = [idProduto, idCesta];
    const query = connect.con.query("DELETE FROM produto WHERE idCesta = ?",
        params, (err, rows, fields) => {
            console.log(query.sql);
            if (!err) {
                res.status(200).json(produto);
            }
            else {
                res.status(jsonMessages.db.errDelete.status)
                   .send(jsonMessages.db.errDelete);
            }
        })
};

function readEstoque(res, req) {
    const idProduto = req.sanitize("idproduto").escape();
    const idLojista = req.sanitize("idLojista").escape();
    const nome = req.sanitize("nome").escape();
    const quantidade = req.sanitize("quantidade").escape();
    const descricao = req.sanitize("descricao").escape();
    const preco = req.sanitize("preco").escape();
    const idCategoria = req.sanitize("idCategoria").escape();
    const idSubcategoria = req.sanitize("idSubcategoria").escape();

    const post = {
        idProduto: idProduto,
        idLojista: idLojista,
        nome: nome,
        quantidade: quantidade,
        descricao: descricao,
        preco: preco,
        idCategoria: idCategoria
    };
    const query = connect.con.query("SELECT idProduto, nome FROM estoque where ? order by +",
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
};

function saveEstoque(req, res) {
    const idProduto = req.sanitize("idproduto").escape();
    const idLojista = req.sanitize("idLojista").escape();
    const nome = req.sanitize("nome").escape();
    const quantidade = req.sanitize("quantidade").escape();
    const descricao = req.sanitize("descricao").escape();
    const preco = req.sanitize("preco").escape();
    const idCategoria = req.sanitize("idCategoria").escape();
    const idSubcategoria = req.sanitize("idSubcategoria").escape();

    const Estoque = req.checkParams("Estoque", "Quantidade de produto maior que zero")
                       .isTrue();
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    } else {

        const idProduto = req.params.idproduto;
        const idLojista = req.params.idLojista;
        const nome = req.params.nome;
        const quantidade = req.params.quantidade;
        const descricao = req.params.descricao;
        const preco = req.params.preco;
        const idCategoria = req.params.idCategoria;
        const idSubcategoria = req.params.idSubcategoria;

        if (idProduto != "NULL" && quantidade != "NULL" && typeof (idProduto) != "undefined" &&
            typeof (quantidade) != "undefined") {
            const post = {
                idProduto: idProduto,
                idLojista: idLojista,
                nome: nome,
                quantidade: quantidade,
                descricao: descricao,
                preco: preco,
                idCategoria: idCategoria,
                idSubcategoria: idSubcategoria
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
};

function deleteEstoque(req, res) {
    const idProduto = req.sanitize("idProduto").escape();
    const idLojista = req.sanitize("idLojista").escape();
    const params = [idProduto, idLojista];
    const query = connect.con.query("DELETE FROM produto WHERE idLojista = ?",
        params, (err, rows, fields) => {
            console.log(query.sql);
            if (!err) {
                res.status(200).json(produto);
            } else {
                res.status(jsonMessages.db.errDelete.status)
                    .send(jsonMessages.db.errDelete);
            }
        })
};

module.exports = {
    readCdstrCesta: readCesta, readCdstrCestaID: readCestaID,
    readCdstrPagamento: readPagamento, saveCdstrPagamento: savePagamento,
    readCdstrProduto: readProduto, saveCdstrProduto: saveProduto,
    readCdstrCliente: readCliente, saveCdstrCliente: saveCliente,
    readCdstrLojista: readLojista, saveCdstrLojista: saveLojista,
    deleteCesta: deleteCesta, deleteCliente: deleteCliente,
    deleteCdstrLojista: deleteLojista, deleteCdstrProduto: deleteProduto,
    saveEstoque: saveEstoque, deleteEstoque: deleteEstoque 
}



   
    
 


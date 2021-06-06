const connect = require("../configBD/connectMySQL");
const jsonMessagesPath = __dirname + "/../assets/jsonMessages";
const jsonMessages = require(jsonMessagesPath + "bd");

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
}

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
}

function deleteEstoque(req, res) {
    const idProduto = req.sanitize("idProduto").escape();
    const idLojista = req.sanitize("idLojista").escape();
    const params = [idProduto, idLojista];
    const query = connect.con.query("DELETE FROM Estoque WHERE idLojista = ?",
        params, (err, rows, fields) => {
            console.log(query.sql);
            if (!err) {
                res.status(200).json(produto);
            } else {
                res.status(jsonMessages.db.errDelete.status)
                    .send(jsonMessages.db.errDelete);
            }
        })
}
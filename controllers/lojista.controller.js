const connect = require("../configBD/connectMySQL");
const jsonMessagesPath = __dirname + "/../assets/jsonMessages";
const jsonMessages = require(jsonMessagesPath + "bd");

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
        lojista: lojista, idLojista: idLojista, nome: nome, 
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

function saveLojista(req, res) {
    const lojista = req.sanitize("lojista").escape();
    const idLojista = req.sanitize("idLojista").escape();
    const nome = req.sanitize("nome").escape();
    const email =  req.sanitize("email").escape();
    const telefone = req.sanitize("telefone").escape();
    const cnpj = req.sanitize("cnpj").escape();
    const razaoSocial = req.sanitize("razaoSocial").escape();
    const nomeFantasia = req.sanitize("nomeFantasia").escape();
    
    const checkParams = req.checkParams("idLojista", "Insira um email válido.").isEmail();

    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    } else {

        const idLojista = req.params.idLojista;
        const nome = req.params.idNome;
        const email = req.params.email;
        const telefone = req.params.telefone;
        const cnpj = req.params.cnpj;
        const razaoSocial = req.params.razaoSocial;
        const nomeFantasia = req.params.nomeFantasia;


        if (idLojista != "NULL" && idCesta != "NULL" && typeof (idLojista) != "undefined" &&
            typeof (idCesta) != "undefined") {
            const post = {
                idLojista: idLojista, nome: nome, email: email, 
                telefone: telefone, cnpj: cnpj, razaoSocial: razaoSocial,
                nomeFantasia: nomeFantasia
            };
            const query = connect.con.query("INSERT INTO lojista SET ?",
                post, (err, rows, fields) => {
                    console.log(query.sql);
                    if (!err) {
                        res.status(jsonMessages.db.successInsert.status)
                            .send(jsonMessages.db.successInsert);
                    } else {
                        console.log(err);
                        if (err.code == "ERR_DUPLICADO_ENTRY") {
                            res.status(jsonMessages.db.duplicateEmail.status)
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

function deleteLojista(req, res) {
    const idLojista = req.sanitize("idLojista").escape();
    const idCesta = req.sanitize("idCesta").escape();
    const params = [idLojista, idCesta];
    const query = connect.con.query("DELETE FROM lojista WHERE idCesta = ? AND idCesta = ?",
        params, (err, rows, fields) => {
            console.log(query.sql);
            if (!err) {
                res.status(200).json(lojista);

            } else {
                res.status(jsonMessages.db.errDelete.status)
                    .send(jsonMessages.db.errDelete);
            }
        })
}
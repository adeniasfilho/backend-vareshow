const jsonMessagesPath = __dirname + '/../assets/jsonMessages/';
const jsonMessages = require(jsonMessagesPath + 'login');
const exports = module.exports = {};

exports.signup = function(req, res) {
    res.status(jsonMessages.user.duplicate.status) .send(jsonMessages.user.duplicate);
};
exports.signupSucess = function(req, res) {
    res.status(jsonMessages.user.signupSucess.status) .send(jsonMessages.user.signupSucess);
};
exports.signin = function(req, res) {
    res.status(jsonMessages.user.invalid.status) .send(jsonMessages.user.invalid);
};
exports.signinSuccess = function(req, res) {
    res.status(jsonMessages.user.signinSuccess.status) .send(jsonMessages.user.signinSuccess);
};

exports.logout = function(req, res, err) {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
    res.status(jsonMessages.user.logoutError.status) .send(jsonMessages.user.logoutError);
        }
    res.status(jsonMessages.user.logoutSuccess.status) .send(jsonMessages.user.logoutSuccess);
    });
};

const connect = require('../configBD/connectMySQL');
const jsonMessagesPath = __dirname + '/../assets/jsonMessages';
const jsonMessages = require(jsonMessagesPath + 'bd');

function readCesta(req, res) {
    const query = connect.con.query('SELECT idCesta, idPedido, idLojista, idCliente + ',
    ' + idProduto FROM cesta order by produto desc',
    function(err, rows, fields) {
        console.log(query.sql);

        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status) .send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
               res.status(jsonMessages.db.noRecords.status) .send(jsonMessages.db.noRecords);
            }
            else {
                res.send(rows);
            }
        }
    });

    function readCestaID(req, res) {
        const idCesta = req.sanitize('idCesta').escape();
        const post = { idCesta: idCesta };
        const query = connect.con.query('SELECT idCesta, idPedido, idLojista, idCliente + ',
        ' + idProduto FROM cesta where idCesta = ? order by produto desc', post, (err, rows, fields) => {
            console.log(query.sql);
        }) 
    }

    function readPagamento(req, res) {
        const idCesta = req.sanitize('idCesta').escape();
        const post = { idCesta: idCesta };
        const query = connect.con.query('SELECT idPagamento, data_hora, status + ',
        ' + forma_de_pagamento FROM status where ? order by idPagamento desc', 
        post, (err, rows, fields) => {
            console.log(query.sql);
        })
    }
    
}
const express = require('express');
const router = express.Router();
router.use(express.json());
const pagamentoDB = require('../model/pagamentoDB');
//const porta = 4000;
//router.set('port', porta);
//const pagamentoDB = require("../ConexaoDB/Conexao.js");
const { INTEGER } = require('sequelize/types');
let contador = 0;

let pagamento = [
    {
        id: INTEGER,
        id_cesta: INTEGER,
        id_cliente: INTEGER,
        forma_pagamento: String,
        data_hora: String,
        entrega: String,
        status: String,
        Email: String,
        Endereco: {
            Logradouro: String,
            Numero: INTEGER,
            Cep: String
        }
    },
];

router.get('/', (req, res, next) => {
    pagamentoDB.getPagamento((pagamento) => {
        res.staus(200).json(pagamento);
    });

});

router.get('/:id(\\d+)', (req, res, next) => {
    const id = req.params.id;
    pagamentoDB.getPagamentoById(id, (pagamento) => {
        res.status(200).json(pagamento);
    });
});

router.post('/', (req, res, next) => {
    const pagamento = req.body;
    pagamentoDB.push({
        id: INTEGER,
        id_cesta: INTEGER,
        id_cliente: INTEGER,
        forma_pagamento: String,
        data_hora: String,
        entrega: String,
        status: String,
        Email: String,
        Endereco: {
            Logradouro: String,
            Numero: INTEGER,
            Cep: String
        }

    });
    console.log(pagamento);
    res.status(201).json(pagamento);
});

router.put('/:id(\\d+)', (req, res, next) => {
    const idPagamentoAlterado = req.params.id;
    console.log(req.body);
    pagamentoDB.forEach((pagamento) => {
        if (pagamento.id == idPagamentoAlterado) {
            pagamento.id_cesta = req.body.id_cesta;
            pagamento.id_cliente = req.body.id_cliente;
            pagamento.forma_pagamento = req.body.forma_pagamento;
            pagamento.data_hora = req.body.data_hora;
            pagamento.entrega = req.body.entrega;
            pagamento.status = req.body.status;
            pagamento.Email = req.body.Email;
            pagamento.Endereco = req.body.Endereco;
        }
    })
    res.status(200).json(pagamento);
});

router.delete('/:id(\\d+)', (req, res, next) => {
    const idPagamentoDelete = req.params.id;
    pagamentoDB.forEach((pagamentos, index) => {
        if (pagamento.id == idPagamentoDelete) pagamento.splice(index, 1)
    })
    res.status(200).json(pagamento);
});

module.exports = router;
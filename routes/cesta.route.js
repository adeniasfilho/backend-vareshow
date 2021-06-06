const connect = require("../config/connectMySQL");
const jsonMessagesPath = __dirname + "/../assets/jsonMessages";
const jsonMessages = require(jsonMessagesPath + "bd");

const express = require('express');
const router = express.Router();
router.use(express.json());
const cestaDB = require("../model/cestaDB");
const { INTEGER } = require('sequelize/types');

let contador = 0;

let cesta = [
    {
     id: INTEGER,
     idCliente: INTEGER,
     idProduto: INTEGER,
     Estoque: String
    }
];

let cesta = [];

router.get('/', (req, res, next) => {
    cestaDB.getCestaCliente((cesta) => {
        console.log(cesta);
        res.status(200).json(cesta);
    })
});

router.get('/:id(\\d+)', (req, res, next) => {
    const id = req.params.id;
    cestaDB.getCestaById(id, (req, res, next) => {
        console.log(cesta);
        res.status(200).json(cesta);
    })
});

router.post('/', (req, res, next) => {
    const cesta = req.body;
    cestaDB.push({
        id: contador += 1,
        idCliente: cesta.id,
        idProduto: cesta.idProduto,
        Quantidade_produto: cesta.Quantidade_produto,
        Estoque: cesta.Estoque 

    });
    console.log(cesta);
    res.status(201).json(cesta)
});

router.put('/:id', (req, res, next) => {
    const idCestaAlterado = req.params.id;
    console.log(req.body);
    cestaDB.forEach((cesta) => {
        if(cesta.id == idCestaAlterado) {
            cesta.idProduto = req.body.idProduto;
            cesta.Quantidade_produto = req.body.Quantidade_produto;
            cesta.Estoque = req.body.Estoque;
            
        }
        }
    )
    res.status(200).json(produto);
});


router.delete('/:id(\\d+)', (req, res, next) => {
    const idCestaDelete = req.params.id;
    cestaDB.forEach((cestas, index) => {
        if (cestas.id == idCestaDelete) cesta.splice(index, 1)
    })
    res.status(200).json(cesta);
});

module.exports = router;

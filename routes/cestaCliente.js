const express = require('express');
const router = express.Router();
router.use(express.json());
const cestaClienteDB = require("../model/cestaClienteDB");
const { INTEGER } = require('sequelize/types');

let contador = 0;

let cestaCliente = [
    {
     id: INTEGER,
     idCliente: INTEGER,
     idProduto: INTEGER,
     Estoque: String
    }
];

let cestaCliente = [];

router.get('/', (req, res, next) => {
    cestaClienteDB.getCestaCliente((cestaCliente) => {
        console.log(cestaCliente);
        res.status(200).json(cestaCliente);

    })
});

router.get('/:id(\\d+)', (req, res, next) => {
    const id = req.params.id;
    cestaClienteDB.getCestaClienteById(id, (req, res, next) => {
        console.log(cestaCliente);
        res.status(200).json(cestaCliente);
    })
});

router.post('/', (req, res, next) => {
    const cestaCliente = req.body;
    cestaClienteDB.push({
        id: contador += 1,
        idCliente: cestaCliente.id,
        idProduto: cestaCliente.idProduto,
        Quantidade_produto: cestaCliente.Quantidade_produto,
        Estoque: cestaCliente.Estoque 

    });
    console.log(cestaCliente);
    res.status(201).json(cestaCliente)
});

router.put('/:id', (req, res, next) => {
    const idCestaClienteAlterado = req.params.id;
    console.log(req.body);
    cestaClienteDB.forEach((cestaCliente) => {
        if(cestaCliente.id == idCestaClienteAlterado) {
            cestaCliente.idProduto = req.body.idProduto;
            cestaCliente.Quantidade_produto = req.body.Quantidade_produto;
            cestaCliente.Estoque = req.body.Estoque;
            
        }
        }
    )
    res.status(200).json(produto);
});


router.delete('/:id(\\d+)', (req, res, next) => {
    const idCestaClienteDelete = req.params.id;
    cestaClienteDB.forEach((cestasClientes, index) => {
        if (cestasClientes.id == idCestaClienteDelete) cestaCliente.splice(index, 1)
    })
    res.status(200).json(cestaCliente);
});

module.exports = router;

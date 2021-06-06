const express = require('express');
const router = express.Router();
router.use(express.json());
const pedidoDB = require("../model/pedidoDB");
const { INTEGER } = require('sequelize/types');

let contador = 0;

let pedido = [
    {
        id: INTEGER,
        idCliente: INTEGER,
        idProduto: INTEGER,
        Estoque: String
    }
];

pedido = [];

router.get('/', (req, res, next) => {
    pedidoClienteDB.getPedidoCliente((pedidoCliente) => {
        console.log(pedidoCliente);
        res.status(200).json(pedidoCliente);

    })
});

router.get('/:id(\\d+)', (req, res, next) => {
    const id = req.params.id;
    pedidoClienteDB.getPedidoClienteById(id, (req, res, next) => {
        console.log(pedidoCliente);
        res.status(200).json(pedidoCliente);
    })
});

router.post('/', (req, res, next) => {
    const pedidoCliente = req.body;
    pedidoClienteDB.push({
        id: contador += 1,
        idCliente: pedidoCliente.id,
        idProduto: pedidoCliente.idProduto,
        Quantidade_produto: pedidoCliente.Quantidade_produto,
        Estoque: pedidoCliente.Estoque

    });
    console.log(pedidoCliente);
    res.status(201).json(pedidoCliente)
});

router.put('/:id', (req, res, next) => {
    const idPedidoClienteAlterado = req.params.id;
    console.log(req.body);
    pedidoClienteDB.forEach((pedidoCliente) => {
        if (pedidoCliente.id == idPedidoClienteAlterado) {
            pedidoCliente.idProduto = req.body.idProduto;
            pedidoCliente.Quantidade_produto = req.body.Quantidade_produto;
            pedidoCliente.Estoque = req.body.Estoque;

        }
    }
    )
    res.status(200).json(pedidoCliente);
});


router.delete('/:id(\\d+)', (req, res, next) => {
    const idCestaClienteDelete = req.params.id;
    cestaClienteDB.forEach((pedidosClientes, index) => {
        if (pedidosClientes.id == idPedidoClienteDelete) pedidoCliente.splice(index, 1)
    })
    res.status(200).json(pedidoCliente);
});

module.exports = router;
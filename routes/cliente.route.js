//const http = require('http');
const express = require('express');
const router = express.Router();
router.use(express.json());
//const porta = 4000;
//router.set('port', porta);
const clienteDB = require('../model/clienteDB');
const { INTEGER } = require('sequelize/types');
let contador = 0;

let cliente = [
    {
    id: INTEGER,
    Nome: String,
    Telefone: String,
    Email: String,
    Endereco: {
        Logradouro: String,
        Numero: INTEGER,
        Cep: String
    },
    CPF: String,
    Senha: String
    }, 
];


router.get('/', (req, res, next) => {
    
    clienteDB.getCliente((cliente) => {
        res.staus(200).json(cliente)
    });
   
});

router.get('/:id(\\d+)', (req, res, next) => {
    const id = req.params.id;
    clienteDB.getClienteById(id, (cliente) =>
        res.status(200).json(cliente)
    )
});

router.post('/', (req, res, next) => {
    const cliente = req.body;
    clienteDB.push({
        id: contador += 1,
        Nome: clientes.Nome,
        Telefone: clientes.Telefone,
        Email: clientes.Email,
        Endereco: clientes.Endereco,
        CPF: clientes.CPF,
        Senha: clientes.Senha
    });
    console.log(clientes);
    res.status(201).json(cliente)
});

router.put('/:id(\\d+)', (req, res, next) => {
    const idClienteAlterado = req.params.id;
    console.log(req.body);
    clienteDB.forEach((cliente) => {
        if (cliente.id == idClienteAlterado) {
            cliente.Nome = req.body.Nome;
            cliente.Telefone = req.body.Telefone;
            cliente.Email = req.body.Email;
            cliente.Endereco = req.body.Endereco;
            cliente.CPF = req.body.CPF;
            cliente.Senha = req.body.Senha;
        }
    })
    res.status(200).json(cliente);
});

router.delete('/:id(\\d+)', (req, res, next) => {
    const idClienteDelete = req.params.id;
    clienteDB.forEach((clientes, index) => {
        if (clientes.id == idClienteDelete) cliente.splice(index, 1)
    })
    res.status(200).json(cliente);
});

module.exports = router;

/*const server = http.createServer(app);
server.listen(4000);*/
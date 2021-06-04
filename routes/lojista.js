//const http = require('http');
const express = require('express');
const { INTEGER } = require('sequelize/types');
const router = express.Router();
router.use(express.json());
//const porta = 3000;
//router.set('port', porta);
let contador = 0;
const lojista = [
    {
        id: INTEGER,
        CNPJ: String,
        Telefone: INTEGER,
        Email: String,
        Endereco: {
            Logradouro: String,
            Numero: String,
            Cep: String
        },
        Nome_fantasia: String,
        Razao_social: String,
        Senha: String
    },
];

router.get('/', (req, res, next) => {
    lojistaDB.getLojista((lojista) => {
        console.log(lojista);
        res.status(200).json(lojista);
    });
});

router.get('/:tipo', (req, res, next) => {
    const tipo = req.params.tipo;
    lojistaDB.getLojistaByTipo(tipo, (req, res, next) => {
        console.log(lojista);
        res.status(200).json(lojista);
    });
});

router.get('/:id(//d+)', (req, res) => {
    const id = req.params.id;
    lojistaDB.getLojistaById(id, (req, res, next) => {
        console.log(lojista);
        res.status(200).json(lojista);
    });
});

router.post('/', (req, res, next) => {
    const lojistas = req.body;
    lojistaDB.push({
        id: contador += 1,
        Telefone: lojistas.Telefone,
        Email: lojistas.Email,
        Endereco: lojista.Endereco,
        CNPJ: lojistas.CNPJ,
        Nome_fantasia: lojistas.Nome_fantasia,
        Razao_social: lojistas.Razao_social,
        Senha: lojistas.Senha
    });
    console.log(lojistas);
    res.status(201).json(lojista);
});

router.put('/:id(\\d+)', (req, res, next) => {
    const idlojistaAlterado = req.params.id;
    console.log(req.body);
    lojistaDB.forEach((lojista) => {
        if (lojista.id == idlojistaAlterado) {
            lojista.Telefone = req.body.Telefone;
            lojista.Email = req.body.Email;
            lojista.Endereco = req.body.Endereco;
            lojista.CNPJ = req.body.CNPJ;
            lojista.Nome_fantasia = req.body.Nome_fantasia;
            lojista.Razao_social = req.body.Razao_social;
            lojista.Senha = req.body.Senha;
        }
    }
    )
    res.status(200).json(lojista);
});

router.delete('/:id(\\d+)', (req, res, next) => {
    const idLojistaDelete = req.params.id;
    lojistaDB.forEach((lojistas, index) => {
        if (lojistas.id == idLojistaDelete) lojista.splice(index, 1)
    })
    res.status(200).json(lojista);
});

module.exports = router;

/*const server = http.createServer(app);
server.listen(3000);*/
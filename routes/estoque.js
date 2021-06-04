//const http = require('http');
const express = require('express');
const router = express.Router();
router.use(express.json());
const estoqueDB = require('../model/estoqueDB');
const { INTEGER } = require('sequelize/types');

//const porta = 5000;
//router.set('port', porta);

let contador =0;
let id = 1;

let produto_ativo = [
    {
        id: INTEGER,
        Nome: String,
        Quantidade: INTEGER,
        Descricao: String,
        Categoria: [],
        Preco: INTEGER,
        id_lojista: INTEGER,
    }

    /*
      referenciasLojista: "Ponto Frio",
      produto: "Televisão",
      tipo: "oled",
      unidadesAdquiridas: 10,
      saida: 5,
      controle: unidadesAdquiridas - saida,
      */
];
let produto_ativo = [];

router.get('/', (req, res, next) => {
    estoqueDB.getProduto((produto) => {
        console.log(produto);
        res.status(200).json(produto);

    })
});

router.get('/:id(\\d+)', (req, res, next) => {
    const id = req.params.id;
    estoqueDB.getProdutoById(id, (req, res, next) => {
        console.log(produto);
        res.status(200).json(produto);
    })
});


router.post('/', (req, res, next) => {
    const produto_ativo = req.body;
    estoqueDB.push({
        id: contador += 1,
        Nome: produto_ativo.Nome,
        Quantidade: produto_ativo.Quantidade,
        Descricao: produto_ativo.Descricao,
        Categoria: produto_ativo.Categoria,
        Preco: produto_ativo.Preco,
        id_lojista: produto_ativo.id_lojista
    });
    console.log(produto);
    res.status(201).json(produto)
});

router.put('/:id', (req, res, next) => {
    const idProdutoAlterado = req.params.id;
    console.log(req.body);
    estoqueDB.forEach((produto) => {
        if(produto.id == idProdutoAlterado){
            produto.Nome = req.body.Nome;
            produto.Quantidade = req.body.Quantidade;
            produto.Descricao = req.body.Descricao;
            produto.Categoria = req.body.Categoria;
            produto.Preco = req.body.Preco;
        }
        }
    )
    res.status(200).json(produto);
});

/*
app.delete("/produto", (req, res, next) => {
    produto.forEach((produto_ativo) => {
        if (produto_ativo.id != req.body.id) {
            const produto_ativo = {
                id: produto_ativo.id,
                minimoProduto: produto_ativo.minimoProduto,
                referenciasLojista: produto_ativo.referenciasLojista,
                produto: produto_ativo.produto,
                tipo: produto_ativo.tipo,
                unidadesAdquiridas: produto_ativo.unidadesAdquiridas,
                saida: produto_ativo.saida,
                total: produto_ativo.total,
            };
            produto_ativo.push(produto_ativo);
        }
    });
    produto = produto_ativo;
    res.status(204).end();
});
*/

router.delete('/:id(\\d+)', (req, res, next) => {
    const idProdutoDelete = req.params.id;
    estoqueDB.forEach((produtos, index) => {
        if (produtos.id == idProdutoDelete) produto.splice(index, 1)
    })
    res.status(200).json(produto);
});

module.exports = router;


/*const server = http.createServer(app);
    server.listen(5000);*/
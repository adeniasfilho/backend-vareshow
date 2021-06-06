const router = require('express').Router();
const controllerLojista = require('../controllers/lojista.controller.js');
const controllerCliente = require('../controllers/cliente.controller.js');
const controllerEmail = require('../controllers/email.controller.js');
const controllerProduto = require('../controllers/produto.controller.js');
const controllerPedidoCliente = require('../controllers/pedidoCliente.controller.js');
const controllerCestaCliente = require('../controllers/cestaCliente.controller.js');
const controllerPagamento = require('../controllers/pagamento.controller.js');
const controllerUser = require('../controllers/user.controller.js');

router.get('/', (req, res) => {
    res.send("vareShow");
    res.end();
});

router.get('/lojistas/', controllerLojista.read);
router.get('/lojistas/:id', controllerLojista.readID);
router.post('/lojistas/', isLoggedIn, controllerLojista.save);
router.put('/lojistas/:id', isLoggedIn, controllerLojista.update);
router.put('/lojistas/del/:id', isLoggedIn, controllerLojista.deleteL);
router.delete('/lojistas/:id', isLoggedIn, controllerLojista.deleteF);

router.get('/produto', controllerProduto.readProduto);
router.get('/produto/:id', controllerProduto.readProdutoID);

// rotas que adicionam cada elemento em uma cesta
router.get('/cesta/:idCesta/produtos', controllerProduto.readCliente);
router.post('/cesta/:idCesta/produtos/:idProduto/', controllerCesta.saveProduto);
router.delete('/cesta/:idCesta/idProduto/produtos/:idProduto', isLoggedIn, controllerCesta.deleteProduto);

router.get('/cesta/:idCesta/lojistas/', controllerCesta.readLojista);
router.post('/cesta/:idCesta/lojistas/:idLojista', isLoggedIn, controllerCesta.saveLojista);
router.delete('/cesta/:idCesta/lojistas/:idLojista', isLoggedIn, controllerCesta.deleteLojista);

router.get('/cesta/:idCesta/clientes/', controllerCesta.readCliente);
router.post('/cesta/:idCesta/clientes/:idCliente', isLoggedIn, controllerCesta.saveCliente);
router.delete('/cesta/:idCesta/clientes/:idCliente', isLoggedIn, controllerCesta.deleteCliente);

router.post('/contacts/emails',controllerEmail.send);

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    else {
        res.status(jsonMessages.login.unauthorized.status) .send(jsonMessages.
            login.unauthorized);
            return next();
    }
}








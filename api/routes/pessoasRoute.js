const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

// Disponibilizei os métodos do controller Pessoas
// Deste estou usando o método GET = pegaTodasAsPessoas
// Quando eu acessar este endpoint, executa
// Como o método é static, não preciso instanciar uma PessoaController
router.get("/pessoas", PessoaController.pegaTodasAsPessoas);

module.exports = router;

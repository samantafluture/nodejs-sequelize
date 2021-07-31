const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router.get("/pessoas", PessoaController.pegaPessoasAtivas);
router.get("/pessoas/todos", PessoaController.pegaTodasAsPessoas);
router.get("/pessoas/:id", PessoaController.pegaUmaPessoa);
router.post("/pessoas", PessoaController.criaPessoa);
router.post("/pessoas/:id/restaura", PessoaController.restauraPessoa);
router.post("/pessoas/:estudanteId/cancela", PessoaController.cancelaPessoa);
router.put("/pessoas/:id", PessoaController.atualizePessoa);
router.delete("/pessoas/:id", PessoaController.apagaPessoa);

router.get(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.pegaUmaMatricula
);
router.get("/pessoas/:estudanteId/matricula", PessoaController.pegaMatriculas);
router.get(
  "/pessoas/matricula/:turmaId/confirmadas",
  PessoaController.pegaMatriculasPorTurma
);
router.get("/pessoas/matricula/lotada", PessoaController.pegaTurmasLotadas);
router.post("/pessoas/:estudanteId/matricula", PessoaController.criaMatricula);
router.post(
  "/pessoas/:estudanteId/matricula/:matriculaId/restaura",
  PessoaController.restauraMatricula
);
router.put(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.atualizaMatricula
);
router.delete(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.apagaMatricula
);


module.exports = router;

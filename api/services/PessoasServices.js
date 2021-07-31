const Services = require("./Services");
const database = require("../models");

class PessoasServices extends Services {
  constructor() {
    super("Pessoas");
    this.matriculas = new Services("Matriculas");
  }

  async pegaRegistrosAtivos(where = {}) {
    // funciona tanto se where não tiver nada como com parâmetros
    return database[this.nomeDoModelo].findAll({ where: { ...where } });
  }

  async pegaTodosOsRegistros(where = {}) {
    return database[this.nomeDoModelo]
      .scope("todos")
      .findAll({ where: { ...where } });
  }

  async cancelaPessoasEMatriculas(estudanteId) {
    return database.sequelize.transaction(async (transacao) => {
      await super.atualizaRegistro(
        { ativo: false }, 
        estudanteId, 
        { transaction: transacao }
      );
      await super.atualizaRegistros(
        { status: "cancelado" },
        { estudante_id: estudanteId },
        { transaction: transacao }
      );
    });
  }
}

module.exports = PessoasServices;

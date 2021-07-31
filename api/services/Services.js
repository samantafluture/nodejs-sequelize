const database = require("../models");

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo;
  }

  async pegaTodosOsRegistros() {
    return database[this.nomeDoModelo].findAll();
  }

  async pegaUmRegistro(id) {}

  async criaRegistro(dados) {}

  // consigo usar este método com ou sem transaction
  async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
    return database[this.nomeDoModelo].update(
      dadosAtualizados,
      {
        where: { id: id },
      },
      transacao
    );
  }

  // atualiza mais de um registro, recebendo mais de um atributo dentro de "where"
  async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
    return database[this.nomeDoModelo].update(
      dadosAtualizados,
      {
        where: { ...where },
      },
      transacao
    );
  }

  async apagaRegistro(id) {}
}

module.exports = Services;

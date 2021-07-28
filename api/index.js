const express = require("express");
const routes = require("./routes");

const app = express();
const port = 3000;

// Chamando as rotas e passando como parâmetro o app express
routes(app);

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`));

module.exports = app;

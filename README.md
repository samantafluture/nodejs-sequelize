# API Node.js com ORM Sequelize

Projeto visa construir uma API Rest com Node.js, Express, Sequelize e MySQL.

## Tecnologias

- Node.js
- Express
- NPM
- Sequelize
- MySQL
- Postman
- Nodemon
- ESLint

## Modelos e associações

![Diagrama das tabelas da API](https://github.com/samantafluture/nodejs-sequelize/blob/refactoring/public/diagrama.png?raw=true)

## O que instalar?

1. Sequelize

`npm install sequelize sequelize-cli path`

`npx sequelize-cli init`

- criar arquivo .sequelizerc para padronizar pastas do projeto

2. Nodemon

`npm install nodemon`

- adicionar script packagejson -> "start": "start": "nodemon ./api/index.js"

3. MySQL

`npm install mysql2`

## Como conectar ao bando de dados?

`sudo mysql -u root -p`

`show databases;`

`create database escola_ingles;`

- alterar arquivo config.json
- acrescentar username, password e database

## Como criar modelos via Sequelize?

- Criar tabela Pessoas com colunas e seus tipos

`npx sequelize-cli model:create --name Pessoas --attributes nome:string,ativo:boolean,email:string,role:string`

- vai gerar os arquivos de models e de migrations do modelo Pessoas

## Como popular o banco de dados via Sequelize?

- No terminal do MySQL (apenas para teste):

`insert into Pessoas (nome, ativo, email, role, createdAt, updatedAt) values ("João Silva", 1, "email@gmail.com", "estudante", NOW(), NOW());`

`select * from Pessoas;`

- Usar seeders via Sequelize:

`npx sequelize-cli seed:generate --name demo-pessoa`

* passando o name de arquivod e seed
* vai criar uma nova semente dentro da pasta seeders com data de criação no nome do arquivo

- Adicionar mais dados no demo-pessoa
- Gerar comando de seed no sequelize para conectar com o banco e enviar esses dados pra lá

`npx sequelize-cli db:seed:all`

- Voltar para o terminal MySQL e ver se populou:

`select * from Pessoas;`

## API no ar

### Métodos

Foram criados os seguintes métodos HTTP para cada modelo.

- GET
- PUT
- POST
- DELETE

### Rotas

![Json com registros da API](https://github.com/samantafluture/nodejs-sequelize/blob/refactoring/public/json.png?raw=true)

Acesse via localhost:3000 as rotas de base abaixo.

- [/pessoas](http://localhost:3000/pessoas)
- [/niveis](http://localhost:3000/niveis)
- [/turmas](http://localhost:3000/turmas)

### Em Construção

- [x] Usar sequelize.transaction() para transações de bancos de dados
- [] Melhorar validações e acrescentar novas



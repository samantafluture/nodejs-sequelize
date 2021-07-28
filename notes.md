# API Node.js com ORM Sequelize e Mysql

- faz comunicação com banco de dados
- cria arquivos de base do projeto

## Comandos para instalações

1. Sequelize

`npm install sequelize sequelize-cli path`

`npx sequelize-cli init`

- criar arquivo .sequelizerc para padronizar pastas do projeto

2. Nodemon

`npm install nodemon`

- adicionar script packagejson -> "start": "start": "nodemon ./api/index.js"

3. MySQL

`npm install mysql2`

## Banco de dados

### Migração em SQL (migrations)

- transferência de dados entre plataformas
- em ORM:
    - alterações incrementais e rastreáveis no banco
    - poder rastrear as alterações feitas (tipo git)
    - coordenar, rastrear e reverter alterações caso precise

### Comandos para criação e conexão

`sudo mysql -u root -p`

`show databases;`

`create database escola_ingles;`

- alterar arquivo config.json
- acrescentar username, password e database

## Modelos via Sequelize

### Criando modelos pelo Sequelize

- Criar tabela Pessoas com colunas e seus tipos

`npx sequelize-cli model:create --name Pessoas --attributes nome:string,ativo:boolean,email:string,role:string`

- vai gerar os arquivos de models e de migrations do modelo Pessoas

## Arquivos criados

- models/index.js
    - veio pronto
    - gerencia os modelos da aplicação
    - checa o ambiente em que estamos, pega as configs que estabelecemos, usa estas infos para criar uma nova instância do sequelize
    - percorre todos os modelos criados, fazer associações e conexões ao banco

- models/pessoas.js
- migrations/....-create-pessoas.js
    - cria as tabelas, up e drop table
    - facilita fazer mudanças, pois diminui o acoplamento
    - sequelize traduz do js para sql

## Migrations via Sequelize

### Comandos para migrations e visualização do resultado

- No terminal do sequelize: 

`npx sequelize-cli db:migrate`

- No terminal do MySQL:

`use escola_ingles;`

`show tables;`

`describe Pessoas;`

## Popular banco de dados

- No terminal do MySQL (apenas para teste):

`insert into Pessoas (nome, ativo, email, role, createdAt, updatedAt) values ("Samanta Fluture", 1, "samantafluture@gmail.com", "estudante", NOW(), NOW());``

`select * from Pessoas;`

- Usar seeders via Sequelize:

`npx sequelize-cli seed:generate --name demo-pessoa`

* passando o name de arquivod e seed
* vai criar uma nova semente dentro da pasta seeders com data de criação no nome do arquivo

### Seeders

- Adicionar mais dados no demo-pessoa
- Gerar comando de seed no sequelize para conectar com o banco e enviar esses dados pra lá

`npx sequelize-cli db:seed:all`

- Voltar para o terminal MySQL e ver se populou:

`select * from Pessoas;`

## Padrão MVC

- Como ligar o modelo ao restante da aplicação?
- Via Controller, fazendo um intermédio, para que o Modelo não fique totalmente acoplado e acessível ao restante da aplicação

### Controller

- Criar pasta /controllers dentro de /api
- Criar o primeiro controller: PessoaControler.js (em maísculo porque será uma classe)
- CRUD: criar, ler, atualizar, deletar
- Métodos que vão na classe (get, create, delete, update)
- Os métodos tem (req, res) pois recebem requisição e devolvem uma resposta

### Routes

- Criar arquivo index.js dentro da pasta /routes dentro de /api
- Será o ponto de entrada das rotas

#### Exemplo: Método GET 

`const todasAsPessoas = await database.Pessoas.findAll();`

- Guardar resultado do que eu pegar no banco
- Vai no banco de dados e puxa o retorno "Pessoas"
- findAll é um método do sequelize (em vez da query sql "select * from...")
- Vai consultar a tabela Pessoas e trazer o resultado

`return res.status(200).json(todasAsPessoas);`

- Retorna a resposta da requisição (todasAsPessoas)
- Com status 200 = ok
- Convertida no formato json


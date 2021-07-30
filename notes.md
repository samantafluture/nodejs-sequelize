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

4. ESLint

`npm install eslint --save-dev`

- adicionar script packagejson -> "lint": "eslint api --fix"

`./node_modules/.bin/eslint --init`

- gerar arquivo de configuração

## Banco de dados

### Migração em SQL (migrations)

- transferência de dados entre plataformas
- em ORM:
    - alterações incrementais e rastreáveis no banco
    - poder rastrear as alterações feitas (tipo git)
    - coordenar, rastrear e reverter alterações caso precise
- podemos executar caso precisem adicionar um nova atributo na tabela
- ou se criamos novas tabelas em nossa database

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

### Quais tabelas/modelos criar primeiro? 

- criar primeiro os modelos de tabelas que não usam chave-estrangeira
- quando criamos uma tabela, não criar atributos que são chaves-estrangeiras (dado importado de outras tabelas)
- apenas os atributos que são naturais desta própria tabela

### Chaves-estrangeiras & Associações entre tabelas

- as associações são feitas nos modelos
- e usam métodos do próprio sequelize para oneToMany, ManyToOne, ManyToMany

`Pessoas.hasMany(models.Turmas);`

- Exemplo: a tabela pessoas tem uma relação de uma para várias Turmas
- Pois dentro da tabela Turmas, tem o docent_id como chave-estrangeira
- Ou seja, um professor pode ter várias turmas!

* caso você não passe uma chave-estrangeira, o padrão do ORM é adicionar na tabela "many/b" uma chave id da tabela "one/a"
* exemplo: a tabela turma ganharia um PessoaId (no singular, vindo da tabela Pessoas)

- Ou podemos passar exatamente o nome que queremos para a foreignKey
- Em seguida, fazer o outro lado da história, falando que o "many" pertence ao "one"

`Turmas.belongsTo(models.Pessoas);`

- Depois, nos arquivos seeders, avisar onde que as chaves-estrangeiras vão ficar
- Adicioanr as colunas que vão receber estas chaves
- Além de acrescentar a coluna, também referenciar de onde a chave vai vir

`references: { model: "Pessoas", key: "id" }`

### Rodar migrações depois que tiver alterações

`npx sequelize-cli db:migrate`

- Ir para o terminal MySQL:

`show tables;`

`describe Matriculas;`
`describe Turmas;`
`describe Niveis;`
`describe Pessoas;`

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

`insert into Pessoas (nome, ativo, email, role, createdAt, updatedAt) values ("João Silva", 1, "email@gmail.com", "estudante", NOW(), NOW());`

`select * from Pessoas;`

- Usar seeders via Sequelize:

`npx sequelize-cli seed:generate --name demo-pessoa`

* passando o name de arquivod e seed
* vai criar uma nova semente dentro da pasta seeders com data de criação no nome do arquivo
* criar sempre os seeders em ordem de uso
* os que usam mais chave-estrangeira por último

`npx sequelize-cli seed:generate --name demo-nivel`
`npx sequelize-cli seed:generate --name demo-turmas`
`npx sequelize-cli seed:generate --name demo-matriculas`

- Depois, fazer o seed:

`npx sequelize-cli db:seed:all`

### Seeders

- Adicionar mais dados no demo-pessoa
- Gerar comando de seed no sequelize para conectar com o banco e enviar esses dados pra lá

`npx sequelize-cli db:seed:all`

- Voltar para o terminal MySQL e ver se populou:

`select * from Pessoas;`
`select * from Niveis;`
`select * from Turmas;`
`select * from Matriculas;`

### Adicionando novas colunas em uma tabela

- Criar via Migrations
- E não alterar diretamente no banco
- Desta forma fica como documentação
- Tabela "SequelizeMeta" monitora todas as alterações no banco

1. Na pasta /migrations, criar um novo arquivo com nome "data e hora de hoje" + "addcolumn-pessoas.js"
2. Use o método "addColumn" e especifique o nome da tabela (exemplo: "deletedAt")
3. Rodar `npx sequelize-cli db:migrate` no terminal para fazer as migrações

- Sempre que deletar um registro, irá acrescentar a data do ato de deletar na coluna "deletedAt"
- Assim, quando for fazer um get nestes registros, a query vai pegar todos os registros que tem "NULL" na coluna "deletedAt", ou seja, que ainda não foram deletados

## Padrão MVC

- Como ligar o modelo ao restante da aplicação?
- Via Controller, fazendo um intermédio, para que o Modelo não fique totalmente acoplado e acessível ao restante da aplicação

## Controller

- Criar pasta /controllers dentro de /api
- Criar o primeiro controller: PessoaControler.js (em maísculo porque será uma classe)
- CRUD: criar, ler, atualizar, deletar
- Métodos que vão na classe (get, create, delete, update)
- Os métodos tem (req, res) pois recebem requisição e devolvem uma resposta

### Exemplo: Método GET 

`const todasAsPessoas = await database.Pessoas.findAll();`

- Guardar resultado do que eu pegar no banco
- Vai no banco de dados e puxa o retorno "Pessoas"
- findAll é um método do sequelize (em vez da query sql "select * from...")
- Vai consultar a tabela Pessoas e trazer o resultado

`return res.status(200).json(todasAsPessoas);`

- Retorna a resposta da requisição (todasAsPessoas)
- Com status 200 = ok
- Convertida no formato json

### Exemplo: Método GET by ID

- Vamos pegar uma pessoa a partir de seu id, que será passado pelo usuário via parâmetros

`const { id } = req.params;``

- Usar o método findOne() do Sequelize
- Especificando o parâmetro "where" em um objeto
- E dentro dele, o id (como number)
- Onde o number é o próprio id

`const umaPessoa = await database.Pessoas.findOne({ where: { id: Number(id) } });`

### Exemplo: Método POST

- Vamos passar um conteúdo no corpo da requisição

`const novaPessoa = req.body;`

- Usar o método create() do Sequelize, passando essa const acima, ou seja, o body da requisição

`const novaPessoaCriada = await database.Pessoas.create(novaPessoa);`

### Exemplo: Método PUT

- Vamos atualizar um registro usando o parâmetro Id
- E as novas infos serão passadas no corpo da requisição

`const { id } = req.params;`
`const novasInfos = req.body;``

- Primeiro, atualiza com o método update() do sequelize

`await database.Pessoas.update(novasInfos, {where: { id: Number(id) }});`

- Depois, retorna o registro atualizado

`const pessoaAtualizada = await database.Pessoas.findOne({where: { id: Number(id) }});`

`res.status(200).json(pessoaAtualizada);`

### Exemplo: Método DELETE

- Vamos deletar um registro a partir de seu id, passado via parâmetro

`const { id } = req.params;`

- Usar o método destroy() do sequelize, pegando o id

`await database.Pessoas.destroy({where: { id: Number(id) }});`

- Retornar uma mensagem de que o registro do id x foi deletado

`return res.status(200).json({ mensagem: `id ${id} deletado` });`

## Routes

- Criar arquivo index.js dentro da pasta /routes dentro de /api
- Será o ponto de entrada das rotas
- Depois de criar os métodos nos controllers, avisar o controller das rotas criadas

### Exemplo de route

`router.get("/pessoas", PessoaController.pegaTodasAsPessoas);`

- Disponibilizei os métodos do controller Pessoas
- Deste estou usando o método GET = pegaTodasAsPessoas
- Quando eu acessar este endpoint, executa
- Como o método é static, não preciso instanciar uma PessoaController
- Para colocar parâmetro (id por exemplo) no endpoint, indicar ele com : (:id)

## Endpoints que só existem na associaçào

- Exemplo: a matrícula só existe se houver outros fatores que são dados de chaves-estrangeiras
- Esse endpoint `/matriculas/` solto não faz muito sentido pro sistema sem estar relacionado com alguma outra tabela
- Faz mais sentido receber, por exemplo: `/pessoas/1/matriculas/`, ou seja, mostrando todas as matrículas da pessoa de id 1
- Em vez de estar solta, sem estar relacionada à nenhum usuário do sistema
- Por conta disso, não vamos criar um controlador e rota próprios para matrícula
- E sim fazer dentro do controlador de pessoas
- Ou seja, as matrículas vão estar sempre vinculadas às pessoas

### Exemplo de rota associada

- Rota que desejamos é associada a uma pessoa
- Exemplo: /pessoas/1/matricula/5
- Seria: /pessoas/:estudanteId/matricula/:matriculaId
- Primeiro, fala quais parâmetros quer pegar, guardando nome da const

`const { estudanteId, matriculaId } = req.params;`

- Depois, dentro do try (try catch), especifica o que são cada um destes parâmetros
- Os nomes tem que ser os mesmos dos das colunas que queremos pegar na tabela associada

`const umaMatricula = await database.Matriculas.findOne({where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },});`

- Com isso, o CRUD não fica mais parado, e sim relacionado!

### Soft Delete

- Exlusão suave via Sequelize chama "Paranoid"
- Acrescentar nos modelos a opção `paranoid: true` dentro do objeto vazio
- Dessa forma, os registros não vão ser apagados de forma permanente
- Na query, vai ser feito um "update" via Sequelize, adicionando timestamp numa colunca "delectAt"
- Temos que criar esta coluna para implementar o Paranoid
- Podemos restaurar um registro caso a gente precise, usando o controlador, criando um método que o usa restore do Sequelize

## Escopos

- Escopos definem funcionalidades e funções
- Como se fosse um filtro
- No Sequelize, o escopo padrão define quais restrições e definições serão utilizadas na query por padrão
- Sequelize usa defaultScope e deve ser incluso dentro dos atributos no modelo, abaixo do paranoid: true
- Neste projeto, queremos que, ao fazer um GET, só aparecem as pessoas com a chave "ativo" de valor "true"
- Por padrão, ao incluir isso, o sequelize vai incluir este novo atributo em todas as querys feitas pelo Sequelize neste modelo
- O escopo padrão pode ser sobrescrito / revertido
- Para adicionar outros registros, passamos o nome dele como parâmetro do método `.scope("todos)` por exemplo
- Assim temos dois métodos GET que pegam pessoas:
    - o padrão é pegar todos os ativos apenas
    - o outro é, usando o escopo "todos", pegar todas as pessoas, incluindo as não ativas

## Validação de dados








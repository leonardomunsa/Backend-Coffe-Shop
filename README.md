## Aplicação back end para controle de estoque

Uma aplicação back end para controle de estoque de loja, onde é possível:
- Criar ingredientes
- Buscar ingredientes
- Criar produtos
- Buscar produtos
- Atualizar produtos
- Deletar produtos
- Checar estoque
- Checar preço de produtos

Foram usadas as tecnologias:
- Node JS
- Mongo DB
- Express
- JWT
- Joi
- Multer
- MD5
- Thunder Client
- Nodemon

## Como clonar o repositório e testar o projeto

Clone o projeto do Github :

```sh
$ git clone git@github.com:leonardomunsa/desafio-backend.git or git clone https://github.com/leonardomunsa/desafio-backend.git
$ cd desafio-backend
```

#### Para que o banco de dados funcione:

```
- crie um arquivo .env
- adicione a variávels MONGO_DB_URL ao arquivo
- coloque a sua string de conexão do mongo db atlas na variávels
```
Você pode usar o mongo db para conectar, ou utilizar uma imagem docker do mesmo.
Esses passos são para uso do Mongo DB Atlas, que só exige uma string coletada no site para conexão.

#### Instale as dependências e inicie a aplicação para fazer as requisições:

```sh
$ npm install
$ npm start
```

Se estiver tudo ok, a aplicação deve rodar no link:

```bash
http://localhost:3000
```

Teste para ver se está correto, adicione ingredientes ao bando de dados e entre no link http://localhost:3000/ingredients,
o resultado deve ser algo parecido com a imagem abaixo:



Uma lista de ingredientes salvos no banco de dados.
# Boas-vindas a API feita com `Express com MySQL`

## Bibliotecas 

- express v4.17.1
- mysql2 v2.3.3
- nodemon v2.0.15
- mocha v8.4.0
- chai v4.3.4
- chai-http 4.3.0
- sinon v11.1.1

## Endpoints

O arquivos `src/routes/login.js` e `src/routes/user.js` contém as definições das rotas que serão utilizadas.

Segue uma descrição do que é esperado que cada endpoint realize:

- `POST /login`: Endpoint responsável por fazer o login do usuário na aplicacao. Os dados a serem armazenados devem ser enviados no corpo da requisição em formato **JSON** seguindo a seguinte estrutura:

```json
{
  "email": "root@gmail.com",
  "password": "rootname"
}
```

### Recebe da API:

```json
{
  "id": 1,
  "name": "root",
  "email": "root@gmail.com",
  "type_id": 1,
  "authorization": "7c73c30a20b6839e"
}
```
### Todos os próximos endpoint necessitam do header "authorization" proveniente da rota /login

- `POST /user`: Endpoint responsável por cadastrar uma nova usuário no banco de dados. Os dados a serem armazenados devem ser enviados no corpo da requisição em formato **JSON** seguindo a seguinte estrutura:

```json
 {
    "name": "Jose",
    "email": "carlos@gmail.com",
    "password": "123456",
    "type_id": 2,
    "cep": 55940000,
    "uf": "PE",
    "city": "Condado",
    "district": "Centro",
    "street": "Rua Louro",
    "number": 120,
    "complement": "Casa"
  }
```

- `PUT /user/:id`: Endpoint responsável por alterar os dados de um usuário no banco de dados. Recebe como parâmetro de rota o `id` da tarefa a ser alterado e um **JSON** no corpo da requisição seguindo a seguinte estrutura:

```json
{
    "name": "Jose",
    "email": "carlos@gmail.com",
    "password": "123456",
    "type_id": 2,
    "cep": 55940000,
    "uf": "PE",
    "city": "Condado",
    "district": "Centro",
    "street": "Rua Louro",
    "number": 120,
    "complement": "Casa"
  }
```

- `DELETE /user/:id`: Endpoint responsável por excluir os dados de um usuário no banco de dados. Recebe como parâmetro de rota o `id` do usuário a ser excluído.

- `GET /user`: Endpoint responsável por recuperar todas os usuários clientes cadastradas no banco de dados. A resposta deve conter um **JSON** seguindo a seguinte estrutura:

```json
[
  {
    "id": 2,
    "name": "Carlos",
    "email": "carlos@gmail.com",
    "type_id": 2,
    "cep": 55940000,
    "uf": "PE",
    "city": "Condado",
    "district": "Centro",
    "street": "Rua Louro",
    "number": 120,
    "complement": "Casa",
    "people_id": 2
  },
  {
    "id": 3,
    "name": "Amanda",
    "email": "amanda@gmail.com",
    "type_id": 2,
    "cep": 55940000,
    "uf": "RJ",
    "city": "Niteroi",
    "district": "Centro",
    "street": "Rua Louro",
    "number": 110,
    "complement": "Casa",
    "people_id": 3
  },
]
```

- `GET /user/:id`: Endpoint responsável por recuperar um usuário cadastrada no banco de dados pelo seu `id`. Recebe como parâmetro de rota o `id` do usuário a ser consultada do banco de dados. A resposta deve conter um **JSON** seguindo a seguinte estrutura:

```json
[
  {
    "id": 2,
    "name": "Carlos",
    "email": "carlos@gmail.com",
    "type_id": 2,
    "cep": 55940000,
    "uf": "PE",
    "city": "Condado",
    "district": "Centro",
    "street": "Rua Louro",
    "number": 120,
    "complement": "Casa",
    "people_id": 2
  }
  ]
```


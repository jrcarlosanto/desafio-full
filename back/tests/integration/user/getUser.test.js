const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const connection = require('../../../src/db/connection');

chai.use(chaiHttp);

const { expect } = chai;

describe('Get /user/:id', function () {

  afterEach(sinon.restore);

  it('Get user/:id', async function () {
    sinon.stub(connection, 'execute').resolves([[
      {
        id: 2,
        name: 'Carlos',
        email: 'carlos@gmail.com',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa',
        people_id: 2
      }]]);

    const response = await chai.request(app)
      .get('/user/2')
      .set('authorization', '52aedf85d7542e28');

    expect(response.status).to.equal(200);
    expect(response.body.length).to.equal(1);
    expect(response.body).to.deep.equal([
      {
        id: 2,
        name: 'Carlos',
        email: 'carlos@gmail.com',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa',
        people_id: 2
      }]);
  });

  it('Get user/:id onde id é uma string', async function () {
    const response = await chai.request(app)
      .get('/user/2dssd')
      .set('authorization', '52aedf85d7542e28');

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('O parametro "id" deve ser um número inteiro maior ou igual a 0');
  });

  it('Get user:id com o token não encontrado', async function () {

    const response = await chai.request(app)
      .get('/user/2');

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('Token não encontrado');
  });

  it('Get user/:id com toke inválido', async function () {

    const response = await chai.request(app)
      .get('/user/2')
      .set('authorization', '52aedf85d7542e');

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('Token inválido');
  });
});

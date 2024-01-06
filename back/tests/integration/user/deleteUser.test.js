const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const connection = require('../../../src/db/connection');

chai.use(chaiHttp);

const { expect } = chai;

describe('Delete /user/:id', function () {

  afterEach(sinon.restore);

  it('Delete user/:id', async function () {
    sinon.stub(connection, 'execute')
      .resolves()
      .resolves();

    const response = await chai.request(app)
      .delete('/user/2')
      .set('authorization', '52aedf85d7542e28');

    expect(response.status).to.equal(202);
  });

  it('Delete user/:id onde id é uma string', async function () {
    const response = await chai.request(app)
      .delete('/user/2dssd')
      .set('authorization', '52aedf85d7542e28');

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('O parametro "id" deve ser um número inteiro maior ou igual a 0');
  });

  it('Delete user:id com o token não encontrado', async function () {

    const response = await chai.request(app)
      .delete('/user/2');

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('Token não encontrado');
  });

  it('Delete user/:id com toke inválido', async function () {

    const response = await chai.request(app)
      .delete('/user/2')
      .set('authorization', '52aedf85d7542e');

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('Token inválido');
  });
});

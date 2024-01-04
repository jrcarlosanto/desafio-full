const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const connection = require('../../../src/db/connection');

chai.use(chaiHttp);

const { expect } = chai;

describe('Post /login', function () {

  afterEach(sinon.restore);

  const emailvalue = 'root@gmail.com';

  it('Fazer o login com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[{
      id: 1,
      name: 'root',
      email: emailvalue,
      type_id: 1,
      password: '$2b$10$xzLCcwKNPmkfGX1HSBG8fulZUshwXZWhbXn/aC12OnxNUibR3JwKO',
    }]]);

    const response = await chai.request(app)
      .post('/login')
      .send({
        email: emailvalue,
        password: 'rootname',
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.includes({
      id: 1,
      name: 'root',
      email: emailvalue,
      type_id: 1,
    });
  });

  it('Usuário não encontrado', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const response = await chai.request(app)
      .post('/login')
      .send({
        email: emailvalue,
        password: 'rootsassa',
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('email ou senha incorretos');
  });

  it('Login com campo email faltando', async function () {
    const response = await chai.request(app)
      .post('/login')
      .send({
        password: 'rootname',
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Campo email requerido');
  });

  it('Login com campo email incorreto escrito errado', async function () {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'root@gmail',
        password: 'rootname',
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('O "email" deve ter o formato "email@email.com"');
  });

  it('Login com password faltando', async function () {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: emailvalue,
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Campo password requerido');
  });

  it('Login com password com menos de 6 caracteres', async function () {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: emailvalue,
        password: '99',
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('O "password" deve ter mais de 5 caracteres');
  });
});
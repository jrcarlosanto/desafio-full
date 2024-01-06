const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const connection = require('../../../src/db/connection');

chai.use(chaiHttp);

const { expect } = chai;

describe('Post /user', function () {

  afterEach(sinon.restore);

  it('Post user com sucesso', async function () {
    sinon.stub(connection, 'execute')
      .resolves([[
        {
          id: 2,
          name: 'Carlos',
          email: 'carlos@gmail.com',
          type_id: 2,
        }]])
      .resolves([[
        {
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
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(201);
    expect(response.body.message).to.equal('User created successfully');
  });


  it('Post user com o token não encontrado', async function () {

    const response = await chai.request(app)
      .post('/user');

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('Token não encontrado');
  });

  it('Post user com toke inválido', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e');

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('Token inválido');
  });

  it('Post user com campo name faltando', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        email: 'carlos@gmail.com',
        password: '123456',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Campo name requerido');
  });

  it('Post user com campo name inválido', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'A',
        email: 'carlos@gmail.com',
        password: '123456',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('O "name" deve ter mais de 2 caracteres');
  });

  it('Post user com campo email faltando', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Jose',
        password: '123456',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Campo email requerido');
  });

  it('Post user com campo email inválido', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Jose',
        email: 'carlos',
        password: '123456',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('O "email" deve ter o formato "email@email.com"');
  });

  it('Post user com campo password faltando', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Jose',
        email: 'jose@example.com',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Campo password requerido');
  });

  it('Post user com campo password inválido', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Jose',
        email: 'jose@example.com',
        password: '123',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('O "password" deve ter mais de 5 caracteres');
  });


  it('Post user com campo  type_id faltando', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Jose',
        email: 'jose@example.com',
        password: 'password',
        cep: 55940000,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Campo type_id requerido');
  });

  it('Post user com campo type_id número inválido', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Jose',
        email: 'jose@example.com',
        password: '123232323',
        type_id: -2,
        cep: 55940000,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('O "type_id" deve ver maior que 0');
  });

  it('Post user com campo type_id com string', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Jose',
        email: 'jose@example.com',
        password: '123232323',
        type_id: 'OK',
        cep: 55940000,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('O "type_id" deve ser um número');
  });

  it('Post user com campo cep faltando', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456',
        type_id: 2,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Campo cep requerido');
  });

  it('Post user com campo cep inválido', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456',
        type_id: 2,
        cep: 5594,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('O "cep" deve ter mais de 7 caracteres');
  });

  it('Post user com campo uf faltando', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456',
        type_id: 2,
        cep: 55940000,
        city: 'Condado',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Campo uf requerido');
  });

  it('Post user com campo uf inválido', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456',
        type_id: 2,
        cep: 55940000,
        uf: 'P',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('O "uf" deve ter mais de 2 caracteres');
  });

  it('Post user com campo city faltando', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Campo city requerido');
  });

  it('Post user com campo city inválido', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'C',
        district: 'Centro',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('O "city" deve ter mais de 2 caracteres');
  });

  it('Post user com campo district faltando', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'San Francisco',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Campo district requerido');
  });

  it('Post user com campo district inválido', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'Condado',
        district: 'C',
        street: 'Rua Louro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('O "district" deve ter mais de 2 caracteres');
  });

  it('Post user com campo street faltando', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'San Francisco',
        district: 'Centro',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Campo street requerido');
  });

  it('Post user com campo district inválido', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'R',
        number: 120,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('O "street" deve ter mais de 2 caracteres');
  });

  it('Post user com campo number faltando', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'San Francisco',
        street: 'San Francisco',
        district: 'Centro',
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Campo number requerido');
  });

  it('Post user com campo number sendo número inválido', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua',
        number: -1,
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('O "number" deve ver maior que 0');
  });

  it('Post user com campo number sendo uma string', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua',
        number: "ok",
        complement: 'Casa'
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('O "number" deve ser um número');
  });

  it('Post user com campo complement faltando ', async function () {

    const response = await chai.request(app)
      .post('/user')
      .set('authorization', '52aedf85d7542e28')
      .send({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456',
        type_id: 2,
        cep: 55940000,
        uf: 'PE',
        city: 'Condado',
        district: 'Centro',
        street: 'Rua',
        number: 10
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Campo complement requerido');
  });
});

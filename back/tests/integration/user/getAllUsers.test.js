const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const connection = require('../../../src/db/connection');

chai.use(chaiHttp);

const { expect } = chai;

describe('Get /user', function () {

  afterEach(sinon.restore);

  it('Get users', async function () {
    sinon.stub(connection, 'execute').resolves([[
      {
        id: 1,
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
      },
      {
        id: 2,
        name: 'Amanda',
        email: 'amanda@gmail.com',
        type_id: 2,
        cep: 55940000,
        uf: 'RJ',
        city: 'Niteroi',
        district: 'Centro',
        street: 'Rua Louro',
        number: 110,
        complement: 'Casa',
        people_id: 3
      }
    ]]);

    const response = await chai.request(app)
      .get('/user')
      .set('authorization', '52aedf85d7542e28');

    expect(response.status).to.equal(200);
    expect(response.body.length).to.equal(2);
    /*expect(response.body).to.equal([
      {
        id: 1,
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
      },
      {
        id: 2,
        name: 'Amanda',
        email: 'amanda@gmail.com',
        type_id: 2,
        cep: 55940000,
        uf: 'RJ',
        city: 'Niteroi',
        district: 'Centro',
        street: 'Rua Louro',
        number: 110,
        complement: 'Casa',
        people_id: 3
      }
    ]);*/
  });

  it('Get user com o token não encontrado', async function () {

    const response = await chai.request(app)
      .get('/user');

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('Token não encontrado');
  });

  it('Get user com toke inválido', async function () {

    const response = await chai.request(app)
      .get('/user')
      .set('authorization', '52aedf85d7542e');

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('Token inválido');
  });
});


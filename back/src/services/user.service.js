const bcrypt = require('bcrypt');
const conn = require('../db/connection');

const getAllUsers = async () => {
  const [data] = await conn
    .execute(`SELECT people.id, name, email, type_id, cep, uf, city, district, street, 
      number, complement, people_id 
      FROM people 
      INNER JOIN address ON people.id = address.people_id`);
  return data;
};

const getUser = async (id) => {
  const [data] = await conn
    .execute(`SELECT people.id, name, email, type_id, cep, uf, city, district, street, 
      number, complement, people_id 
      FROM people 
      INNER JOIN address ON people.id = address.people_id
      WHERE people.id = ?`, [id]);
  return data;
};

const createPasssword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const createUser = async (user) => {
  const { name, email, password, type_id, cep, uf, city, district,
    street, number, complement } = user;
  const newPassword = createPasssword(password);
  const [result] = await conn.execute(`INSERT INTO people (name, email, password, type_id) 
  VALUES (?, ?, ?, ?)`, [name, email, newPassword, type_id]);

  const peopleId = result.insertId;
  await conn.execute(`INSERT INTO  address (cep, uf, city, district, 
  street, number, complement, people_id) VALUES (?, ?, ?, ?, ?, ? , ?, ?)`,
    [cep, uf, city, district, street, number, complement, peopleId]);

};

module.exports = { getAllUsers, getUser, createUser };

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

module.exports = { getAllUsers, getUser };

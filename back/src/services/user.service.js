const conn = require('../db/connection');

const getAllUsers = async () => {
  const [data] = await conn
    .execute(`SELECT name, email, type_id, cep, uf, city, district, street, 
      number, complement, people_id 
      FROM people 
      INNER JOIN address ON people.id = address.people_id`);
  return data;
};

module.exports = { getAllUsers };

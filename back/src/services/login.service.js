const bcrypt = require('bcrypt');

const conn = require('../db/connection');

const getPeople = async (email) => {
  const [data] = await conn
    .execute('SELECT * FROM people WHERE email= ?', [email]);
  return data;
};

const login = async (obj) => {
  const { email, password } = obj;
  const users = await getPeople(email);

  if (users.length > 0) {
    const user = users.find((elem) => bcrypt.compareSync(password, elem.password));
    delete user.password;
    return user;
  }
  return undefined;
};

module.exports = { login };
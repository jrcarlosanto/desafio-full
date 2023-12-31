const express = require('express');
const { getAllUsers, getUser, createUser, uptadeUser,
  deleteUser } = require('../services/user.service');
const { authorization } = require('../middlewares/authorization.middleware');
const { paramId } = require('../middlewares/paramId.middeware');
const { name } = require('../middlewares/name.middleware');
const { email } = require('../middlewares/email.middleware');
const { password } = require('../middlewares/password.middleware');
const { typeId } = require('../middlewares/typeId.middleware');
const { cep } = require('../middlewares/cep.middleware');
const { uf } = require('../middlewares/uf.middleware');
const { city } = require('../middlewares/city.middleware');
const { street } = require('../middlewares/street.middleware');
const { number } = require('../middlewares/number.middleware');
const { complement } = require('../middlewares/complement.middleware');
const { district } = require('../middlewares/district.middleware');

const router = express.Router();

router.get('/user', authorization, async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

router.get('/user/:id', authorization, paramId, async (req, res) => {
  const { id } = req.params;
  const users = await getUser(Number(id));
  res.status(200).json(users);
});

router.post('/user', authorization, name, email, password, typeId, cep,
  uf, city, district, street, number, complement, async (req, res) => {
    const newUser = req.body;
    await createUser(newUser);
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  });

router.put('/user/:id', authorization, paramId, name, email, password, typeId, cep,
  uf, city, district, street, number, complement, async (req, res) => {
    const { id } = req.params;
    const newUser = req.body;
    await uptadeUser(newUser, Number(id));
    res.status(200).json({ message: 'Usuário atualizado com sucesso' });
  });

router.delete('/user/:id', authorization, paramId, async (req, res) => {
  const { id } = req.params;
  await deleteUser(Number(id));
  res.status(202).end();
});

module.exports = router;
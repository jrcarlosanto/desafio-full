const express = require('express');
const { getAllUsers, getUser } = require('../services/user.service');
const { authorization } = require('../middlewares/authorization.middleware');
const { paramId } = require('../middlewares/paramId.middeware');

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

module.exports = router;
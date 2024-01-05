const express = require('express');
const { getAllUsers } = require('../services/user.service');
const { authorization } = require('../middlewares/authorization.middleware');
const router = express.Router();

router.get('/user', authorization, async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

module.exports = router;
const email = (req, res, next) => {
  const obj = req.body;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (!Object.keys(obj).includes('email')) {
    return res.status(404).json({ message: 'Campo email requerido' });
  }

  if (!obj.email.match(emailRegex)) {
    return res.status(404).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
};

module.exports = { email };

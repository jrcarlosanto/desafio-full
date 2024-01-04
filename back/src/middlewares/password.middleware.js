const password = (req, res, next) => {
    const obj = req.body;

    if (!Object.keys(obj).includes('password')) {
        return res.status(404).json({ message: 'Campo password requerido' });
    }

    if (obj.password.length < 6) {
        return res.status(404).json({
            message: 'O "password" deve ter mais de 5 caracteres',
        });
    }

    next();
};

module.exports = { password };

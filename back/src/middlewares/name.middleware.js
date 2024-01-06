const name = (req, res, next) => {
    const obj = req.body;

    if (!Object.keys(obj).includes('name')) {
        return res.status(404).json({ message: 'Campo name requerido' });
    }

    if (obj.name.length < 2) {
        return res.status(404).json({
            message: 'O "name" deve ter mais de 2 caracteres',
        });
    }

    next();
};

module.exports = { name };

const street = (req, res, next) => {
    const obj = req.body;

    if (!Object.keys(obj).includes('street')) {
        return res.status(404).json({ message: 'Campo street requerido' });
    }

    if (obj.street.length < 2) {
        return res.status(404).json({
            message: 'O "street" deve ter mais de 2 caracteres',
        });
    }

    next();
};

module.exports = { street };

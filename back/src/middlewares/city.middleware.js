const city = (req, res, next) => {
    const obj = req.body;

    if (!Object.keys(obj).includes('city')) {
        return res.status(404).json({ message: 'Campo city requerido' });
    }

    if (obj.city.length < 2) {
        return res.status(404).json({
            message: 'O "city" deve ter mais de 2 caracteres',
        });
    }

    next();
};

module.exports = { city };

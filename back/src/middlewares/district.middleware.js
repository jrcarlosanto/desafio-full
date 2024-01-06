const district = (req, res, next) => {
    const obj = req.body;

    if (!Object.keys(obj).includes('district')) {
        return res.status(404).json({ message: 'Campo district requerido' });
    }

    if (obj.district.length < 2) {
        return res.status(404).json({
            message: 'O "district" deve ter mais de 2 caracteres',
        });
    }

    next();
};

module.exports = { district };

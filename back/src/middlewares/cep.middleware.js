const cep = (req, res, next) => {
    const obj = req.body;

    if (!Object.keys(obj).includes('cep')) {
        return res.status(404).json({ message: 'Campo cep requerido' });
    }

    if (obj.cep.toString().length < 7) {
        return res.status(404).json({
            message: 'O "cep" deve ter mais de 7 caracteres',
        });
    }

    next();
};

module.exports = { cep };

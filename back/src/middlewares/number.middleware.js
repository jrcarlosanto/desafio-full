const number = (req, res, next) => {
    const obj = req.body;
    if (!Object.keys(obj).includes('number')) {
        return res.status(404).json({ message: 'Campo number requerido' });
    }

    if (!Number.isInteger(obj.number)) {
        return res.status(404).json({
            message: 'O "number" deve ser um número',
        });
    }

    if (obj.number < 0) {
        return res.status(404).json({
            message: 'O "number" deve ver maior que 0',
        });
    }

    next();
};

module.exports = { number };

const typeId = (req, res, next) => {
    const obj = req.body;
    if (!Object.keys(obj).includes('type_id')) {
        return res.status(404).json({ message: 'Campo type_id requerido' });
    }

    if (!Number.isInteger(obj.type_id)) {
        return res.status(404).json({
            message: 'O "type_id" deve ser um número',
        });
    }

    if (obj.type_id < 0) {
        return res.status(404).json({
            message: 'O "type_id" deve ver maior que 0',
        });
    }

    next();
};

module.exports = { typeId };

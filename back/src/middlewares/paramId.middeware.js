const paramId = (req, res, next) => {
    const obj = req.params;

    if (!Number.isInteger(Number(obj.id)) || Number(obj.id) < 0) {
        return res.status(404).json({
            message: 'O parametro "id" deve ser um número inteiro maior ou igual a 0',
        });
    }

    next();
};

module.exports = { paramId };

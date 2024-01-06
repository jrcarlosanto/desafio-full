const uf = (req, res, next) => {
    const obj = req.body;

    if (!Object.keys(obj).includes('uf')) {
        return res.status(404).json({ message: 'Campo uf requerido' });
    }

    if (obj.uf.length < 2) {
        return res.status(404).json({
            message: 'O "uf" deve ter mais de 2 caracteres',
        });
    }

    next();
};

module.exports = { uf };

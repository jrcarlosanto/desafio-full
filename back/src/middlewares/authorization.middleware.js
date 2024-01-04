const authorization = (req, res, next) => {
    const header = req.headers;

    if (!Object.keys(header).find((key) => key.toLocaleLowerCase() === 'authorization')) {
        return res.status(401).json({
            message: 'Token não encontrado',
        });
    }

    if (header.authorization.length !== 16 || Number.isNaN(header.authorization)) {
        return res.status(401).json({
            message: 'Token inválido',
        });
    }

    next();
};

module.exports = { authorization };
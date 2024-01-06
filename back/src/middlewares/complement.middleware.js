const complement = (req, res, next) => {
    const obj = req.body;

    if (!Object.keys(obj).includes('complement')) {
        return res.status(404).json({ message: 'Campo complement requerido' });
    }

    next();
};

module.exports = { complement };

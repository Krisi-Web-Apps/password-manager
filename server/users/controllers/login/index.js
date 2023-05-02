const login = (req, res) => {
    const { email, password } = req.body;
    res.send({ email, password });
}

module.exports = login;

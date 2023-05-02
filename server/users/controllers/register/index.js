const register = (req, res) => {
    const { username, email, password, cpassword } = req.body;
    res.send({ username, email, password, cpassword });
}

module.exports = register;

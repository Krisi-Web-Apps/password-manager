const get = {
    home: (req, res) => {
        res.send({ message: "Hello, World!" });
    },
    about: (req, res) => {
        res.send({ message: "This is about!" });
    },
    forAuth: (req, res) => {
        res.send({ message: "This is for auth!" });
    },
    forAdmin: (req, res) => {
        res.send({ message: "This is for admin!" });
    },
}

module.exports = {
    get,
}

const get = {
    home: (req, res) => {
        res.send({ message: "Hello, World!" });
    },
    about: (req, res) => {
        res.send({ message: "This is about!" });
    }
}

module.exports = {
    get,
}

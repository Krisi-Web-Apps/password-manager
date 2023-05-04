const isAdmin = (req, res, next) => {
    if (req.user?.role_as !== "admin") {
        res.send({ message: "Yor are not authorized!" });
    }
}

module.exports = isAdmin;

const { requireOnlyLetters } = require("@src/validators");

const insert = (title, passwordText) => {
    if (!title || !requireOnlyLetters(title) || title?.length < 3) return "Title must be longer than 3 letters.";
    if (!passwordText) return "Password is required!";
}

module.exports = {
    insert,
}
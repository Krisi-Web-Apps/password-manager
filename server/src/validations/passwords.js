const { onlyLettersAndSpaces } = require("@src/validators");

const insert = (title, passwordText) => {
    if (!title) return "Title is required!";
    if ((title.length > 3) === false) return "Title must be longer than 3 letters.";
    if (onlyLettersAndSpaces(title) === false) return "Title must be only letters.";
    if (!passwordText) return "Password is required!";
}

module.exports = {
    insert,
}
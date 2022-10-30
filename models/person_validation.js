function valid(number) {
    if (number.length < 8)
        return false

    const parts = number.split('-')
    if (parts.length != 2)
        return false

    return parts[0].length == 2 || parts[0].length == 3;
}

module.exports = { valid }

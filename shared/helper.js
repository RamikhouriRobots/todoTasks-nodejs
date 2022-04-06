module.exports = function cipher(key, encoded) {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applyKeyToChar = code => textToChars(key).reduce((a, b) => a ^ b, code);

    return encoded.split('')
        .map(textToChars)
        .map(applyKeyToChar)
        .map(byteHex)
        .join('');
}

module.exports = function decipher(key, encoded) {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applyKeyToChar = code => textToChars(key).reduce((a, b) => a ^ b, code);
    return encoded.match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applyKeyToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('');
}


module.exports = function getUUID() {
    var d = new Date().getTime();
    var newGuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );

    return newGuid;
};
const createShortUrl = function (longUrl) {
    let possibleCharacters = [abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789]
    let shortUrl = []
    while (longUrl)
    {
        shortUrl.push(possibleCharacters[lon % 62]);
        n = Math.floor(n / 62);
    }
    
}

const getLongUrl = function (shortUrl) {
    
}

module.exports = {
    createShortUrl,
    getLongUrl
}
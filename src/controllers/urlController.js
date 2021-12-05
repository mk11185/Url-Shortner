const { client } = require('../index')
const { urlModel } = require('../models')
const { promisify } = require('util')
const validUrl = require('valid-url')
const shortId = require('shortid')

const setexAsync = promisify(client.SETEX).bind(client)
const getAsync = promisify(client.GET).bind(client)

const shortUrl = async function (req, res) {
    try {
        const { longUrl } = req.body

        if (!validUrl.isUri(longUrl)) {
            return res.status(400).send({ status: false, message: 'longUrl is not valid' })
        }

        const urlCode = shortId.generate()
        const url = await urlModel.findOne({ longUrl })
        if (!url) {
            const newUrl = urlModel.create({
                longUrl,
                shortUrl: `http:localhost:3000/${urlCode}`,
                urlCode
            })
            setexAsync(urlCode, 60 * 60, longUrl)
            res.status(201).send({ status: true, data: newUrl })
        }
        res.status(201).send({ status: true, data: url })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
}

const getUrl = async function (req, res) {
    try {
        const urlCode = req.params.code;
        let cacheUrl = await getAsync(urlCode)
        if (!cacheUrl) {
            let url = await urlModel.findOne({ urlCode })
            if (!url) {
                res.status(404).send({ status: false, message: 'not valid url' })
            }
            res.redirect(url)
        }
        res.redirect(cacheUrl)
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
}

module.exports = {
    shortUrl,
    getUrl
}
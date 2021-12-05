const { redisClient } = require('../server')
const { urlModel } = require('../models')
const { promisify } = require('util')
const validUrl = require('valid-url')
const shortId = require('shortid')

const SETEX_ASYNC = promisify(redisClient.SETEX).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

const shortUrl = async function (req, res) {
    try {
        const { longUrl } = req.body

        if (!validUrl.isUri(longUrl)) {
            return res.status(400).send({ status: false, message: 'longUrl is not valid' })
        }

        const urlCode = shortId.generate()
        const url = await urlModel.findOne({ longUrl })
        if (!url) {
            const newUrl = await urlModel.create({
                longUrl,
                shortUrl: `http:localhost:3000/${urlCode}`,
                urlCode
            })
            await SETEX_ASYNC(urlCode, 60 * 60, longUrl)
            return res.status(201).send({ status: true, data: newUrl })
        }
        // await SETEX_ASYNC(urlCode, 60 * 60, longUrl)
        return res.status(201).send({ status: true, data: url })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message });
    }
}

const getUrl = async function (req, res) {
    try {
        const urlCode = req.params.code;
        let cacheUrl = await GET_ASYNC(urlCode)
        if (!cacheUrl) {
            let url = await urlModel.findOne({ urlCode })
            if (!url) {
                return res.status(404).send({ status: false, message: 'not valid url' })
            }
            return res.redirect(url.longUrl)
        }
        return res.redirect(cacheUrl)
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message });
    }
}

module.exports = {
    shortUrl,
    getUrl
}
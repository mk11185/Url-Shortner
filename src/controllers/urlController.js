const { client } = require('../index')
const { urlModel } = require('../models')
const { promisify } = require('util')
const validUrl = require('valid-url')

const setexAsync = promisify(client.setEx).bind(client)
const getAsync = promisify(client.get).bind(client)

const shortUrl = async function (req, res) {
    try {
        const {longUrl} = req.body

        if(!validUrl.isUri(longUrl)){
            return res.status(400).send({status:false, message: 'longUrl is not valid'})
        }

        

    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
}

const getUrl = async function (req, res) {
    try {

    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
}

module.exports = {
    shortUrl,
    getUrl
}
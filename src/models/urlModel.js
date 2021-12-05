const mongoose = require('mongoose')

const URLSchema = new mongoose.Schema({

    urlCode: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        unique: true,
    },

})

module.exports = mongoose.model('Url', URLSchema)
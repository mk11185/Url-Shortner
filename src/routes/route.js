const express = require('express')
const router = express.Router();
const {urlController} = require('../controllers')

router.get('/shortUrl',urlController.shortUrl);
router.get('/:code',urlController.getUrl);

module.exports = router;
var express = require('express');
var router = express.Router();

router.use('/etc', require('./upload'));

module.exports = router;
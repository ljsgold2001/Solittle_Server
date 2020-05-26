var express = require('express');
var router = express.Router();

router.use('/main', require('./main'));

module.exports = router;
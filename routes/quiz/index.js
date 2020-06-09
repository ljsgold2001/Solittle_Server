var express = require('express');
var router = express.Router();

router.use('/quiz', require('./quiz'));
router.use('/myvoca', require('./myvoca'));
module.exports = router;
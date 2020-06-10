var express = require('express');
var router = express.Router();

router.use('/user', require('./user'));
router.use('/main', require('./main'));
router.use('/quiz', require('./quiz'));
router.use('/etc', require('/etc'));

module.exports = router;
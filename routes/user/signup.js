
var express = require('express');
var router = express.Router();
const crypto = require('crypto-promise');
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const db = require('../../module/pool');


router.post('/', async (req, res) => {
    const selectUserQuery = 'SELECT * FROM user WHERE email = ?'
    //console.log("여기까지는")
    const selectUserResult = await db.queryParam_Parse(selectUserQuery, [req.body.email]);
    const signupQuery = 'INSERT INTO user (email, password, salt, name) VALUES (?, ?, ?, ?)';
    if(selectUserResult.length == 0) {  
        const buf= await crypto.randomBytes(64);
        const salt = buf.toString('base64');
        const hashedPw = await crypto.pbkdf2(req.body.password.toString(), salt, 1000, 32, 'SHA512');
        const signupResult = await db.queryParam_Parse(signupQuery, [req.body.email, hashedPw.toString('base64'), salt, req.body.name]);
        if (signupResult.length == 0) {
            res.status(200).send(util.successFalse(statusCode.DB_ERROR, resMessage.USER_INSERT_FAIL));
        } else {  
            res.status(200).send(util.successTrue(statusCode.OK, resMessage.SIGNUP_SUCCESS));
        }
    }else {
        console.log("중복된 email이 있습니다.");
        res.status(200).send(util.successFalse(statusCode.OK, resMessage.SIGNUP_FAIL));
    }
});

module.exports = router;
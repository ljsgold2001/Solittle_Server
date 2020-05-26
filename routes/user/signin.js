
var express = require('express');
var router = express.Router();
const crypto = require('crypto-promise');
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const db = require('../../module/pool');
const jwtUtils = require('../../module/jwt');


router.post('/', async(req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(200).send(util.successFalse(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    } else {
        const selectUserQuery = 'SELECT * FROM user WHERE email = ?'
        const selectUserResult = await db.queryParam_Parse(selectUserQuery, [req.body.email]);
        if(selectUserResult.length == 0){
            res.status(200).send(util.successFalse(statusCode.OK, resMessage.NO_USER));
        }else{
            const salt = selectUserResult[0].salt;
            const hashedEnterPw = await crypto.pbkdf2(req.body.password.toString(),salt,1000, 32, 'SHA512');//현재 사용자가 로그인을 위해 입력한 pw
            
            //현재 사용자가 입력한 비밀번호와 회원가입시의 비밀번호를 비교해준다.
            if(selectUserResult[0].password == hashedEnterPw.toString('base64')){
                const tokens = jwtUtils.sign(selectUserResult[0]); //jwt에 있는 sign의 구조체 형식의 토큰을 발급받는다.
                const refreshToken = tokens.refreshToken; //refresh토큰은 위의 token의 refresh token값
                const refreshTokenUpdateQuery = "UPDATE user SET refreshtoken = ? WHERE email = ?";//토큰을 업데이트 시켜야한다.
                const refreshTokenUpdateResult = await db.queryParam_Parse(refreshTokenUpdateQuery, [refreshToken, req.body.email]);

                if (refreshTokenUpdateResult.length == 0) {
                    res.status(200).send(util.successTrue(statusCode.DB_ERROR, resMessage.REFRESH_UPDATE_ERROR));
                } else {
                    const token_result = [];

                    var json = new Object();//제이슨 객체 생성
                    json.token = tokens.token; //제이슨 객체 안에  token 이라는 이름으로 jwt 모듈의 tokens 의 토큰을 넣어준다.
                    json.refreshToken = tokens.refreshToken;
                    //email, name, expires_in 추가하기
                    json.email = req.body.email;
                    json.name = selectUserResult[0].name;
                    json.expires_in = 3600;
                    token_result.push(json);
                    res.status(200).send(util.successTrue(statusCode.OK, resMessage.LOGIN_SUCCESS, token_result)); //token, refreshtoken 보내준다.
                }
            }else{//사용자가 입력한 비밀번호와 회원가입시의 비밀번호가 다를경우
                res.status(200).send(util.successFalse(statusCode.OK, resMessage.MISS_MATCH_PW));
            }
        }
    }
});

module.exports = router;




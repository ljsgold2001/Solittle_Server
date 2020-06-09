var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const db = require('../../module/pool');
const authUtil = require("../../module/authUtils");

//메인
router.get('/', authUtil.isLoggedin, async(req, res)=>{
    const getCategoryQuery = 'SELECT  DISTINCT category_name FROM category';
    const getCategoryResult = await db.queryParam_None(getCategoryQuery);

    if(getCategoryResult.length==0){//카테고리 GET 실패시
        res.status(200).send(util.successFalse(statusCode.DB_ERROR,resMessage.GET_MAIN_ERROR));
    }
    else{// 카테고리 GET 성공시
        res.status(200).send(util.successTrue(statusCode.OK, resMessage.GET_MAIN_SUCCESS,getCategoryResult));
        for(i = 0;  i<getCategoryResult.length;  i++){
            //console.log(getCategoryResult[i]);
        }
        
    }

});
    
module.exports = router;


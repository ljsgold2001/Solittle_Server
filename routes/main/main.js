var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const db = require('../../module/pool');
const authUtil = require("../../module/authUtils");

//메인
router.get('/', authUtil.isLoggedin, async(req, res)=>{
    const getCategoryQuery = 'SELECT category_name FROM category';
    const getCategoryResult = await db.queryParam_None(getCategoryQuery);

    if(getCategoryResult.length==0){
        res.status(200).send(util.successFalse(statusCode.DB_ERROR,resMessage.DB_ERROR));
    }
    else{
        res.status(200).send(util.successTrue(statusCode.OK, resMessage.GET_MAIN_SUCCESS));
        for(i = 0;  i<getCategoryResult.length;  i++){
            console.log(getCategoryResult[i]);
        }
        
    }

});
    
module.exports = router;


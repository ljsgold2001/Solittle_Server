var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const db = require('../../module/pool');
const authUtil = require("../../module/authUtils");

//메인
router.get('/:category', authUtil.isLoggedin, async(req, res)=>{
    const category = req.params.category
    const getLevelQuery = 'SELECT level_idx FROM category WHERE category_name =?';
    const getLevelResult = await db.queryParam_Arr(getLevelQuery , [category]);

    if(getLevelResult.length==0){//LEVEL GET 실패시
        res.status(200).send(util.successFalse(statusCode.DB_ERROR,resMessage.GET_LEVEL_FAIL));
    }
    else{// LEVEL GET 성공시
        res.status(200).send(util.successTrue(statusCode.OK, resMessage.GET_LEVEL_SUCCESS,getLevelResult));
        //console.log("성공");
        for(i = 0;  i<getLevelResult.length;  i++){
            
            console.log(getLevelResult[i]);
        }
        
    }

});
    
module.exports = router;


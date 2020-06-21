var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const db = require('../../module/pool');
const authUtil = require("../../module/authUtils");



//myvoca 로드
router.get('/:category_name', authUtil.isLoggedin, async(req, res)=>{
    
    const category_name = req.params.category_name;
    const useridx = req.decoded.idx;
    console.log(useridx)
    console.log(category_name)

    const getMyVocaQuery = 'SELECT  * FROM myvoca WHERE userIdx =? and category_name =?';
    const getMyVocaResult = await db.queryParam_Arr(getMyVocaQuery , [useridx,category_name]);

    const checkCategoryQuery = 'SELECT * FROM category WHERE category_name =?'
    const checkCategoryResult = await db.queryParam_Arr(checkCategoryQuery , [category_name]);
    console.log(checkCategoryResult)


    if(checkCategoryResult.length == 0){
        res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,resMessage.WRONG_CATEGORY_NAME));
    }else{
        if(getMyVocaResult.length == 0){//WORD GET 실패시
            res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,resMessage.GET_MYVOCA_FAIL));
            console.log("2")
        }
        else{// WORD GET 성공시
            res.status(200).send(util.successTrue(statusCode.OK, resMessage.GET_MYVOCA_SUCCESS,getMyVocaResult));
            console.log("3")
            // for(i = 0;  i<getMyVocaResult.length;  i++){

            //    console.log(getMyVocaResult[i]);
            // }
            
            }
    }


});
    
module.exports = router;
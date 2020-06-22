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
    //나의 단어장 + 단어장에서 단어목록을 전송해줄때 사용하는 쿼리
    const getMyVocaQuery = 'SELECT * FROM myvoca natural join voca where userIdx = ? AND category_name = ?;';
    const getMyVocaResult = await db.queryParam_Arr(getMyVocaQuery , [useridx,category_name]);
    // 카테고리 Name이 올바른지 알아보는 쿼리
    const checkCategoryQuery = 'SELECT * FROM category WHERE category_name =?'
    const checkCategoryResult = await db.queryParam_Arr(checkCategoryQuery , [category_name]);
    console.log(checkCategoryResult)


    if(checkCategoryResult.length == 0){//카테고리 이름이 올바르지않으면 오류전송
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
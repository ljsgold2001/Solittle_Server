var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const db = require('../../module/pool');
const authUtil = require("../../module/authUtils");



//메인ㅣ
router.get('/:category/:level', authUtil.isLoggedin, async(req, res)=>{
    
    const category = req.params.category
    const level = req.params.level
    const getWordQuery = 'SELECT  * FROM voca WHERE category_name = ? AND level_idx = ? ';

    const getWordResult = await db.queryParam_Arr(getWordQuery , [category,level]);


    if(getWordResult.length==0){//WORD GET 실패시
        res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,resMessage.GET_WORD_FAIL));
    }
    else{// WORD GET 성공시
        res.status(200).send(util.successTrue(statusCode.OK, resMessage.GET_WORD_SUCCESS,getWordResult));
        //for(i = 0;  i<getWordResult.length;  i++){
        //   console.log(getWordResult[i]);
        
        
    }
    


});
    
module.exports = router;


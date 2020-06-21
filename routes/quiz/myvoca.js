var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const db = require('../../module/pool');
const authUtil = require("../../module/authUtils");



//메인ㅣ
router.get('/:voca_idx/:category_name/:level_idx', authUtil.isLoggedin, async(req, res)=>{
    
    //넘긴 
    const voca_idx = req.params.voca_idx;
    const category_name = req.params.category_name;
    const level_idx = req.params.level_idx;
    const useridx = req.decoded.idx;

    console.log(voca_idx);
    console.log(useridx);
    
    const CheckNameQuery = "SELECT category_name FROM voca WHERE voca_idx =?"
    const ChecklevelQuery = "SELECT level_idx FROM voca WHERE voca_idx =?" 
    const GetNameResult = await db.queryParam_Arr(CheckNameQuery , [voca_idx]);
    const GetLevelResult = await db.queryParam_Arr(ChecklevelQuery , [voca_idx]);
    

    if(GetNameResult[0].category_name == category_name && GetLevelResult[0].level_idx == level_idx){
        const CheckInMyvocaQuery = "SELECT * FROM myvoca WHERE voca_idx =? AND userIdx =?"
        const CheckINMyvocaResult = await db.queryParam_Arr(CheckInMyvocaQuery , [voca_idx, useridx]);
        
        if (CheckINMyvocaResult.length !=0 ){//myvoca에 중복 INSERT 방지
            res.status(200).send(util.successFalse(statusCode.DB_ERROR, resMessage.ALREADY_EXIST_IN_MYVOCA));
        }
        else{
            //여기서 올바른지 안올바른지 확인해줘야하는 로직이 추가되어야 한다. 아니면 param의 값이 잘못되어도 추가됨
            
            const insertTransaction = await db.Transaction(async (connection) => {
            const InsertMyVocaQuery = "INSERT INTO myvoca (useridx , category_name , level_idx , voca_idx) VALUES(?, ?, ?, ?)"
            const insertMyVocaResult = await connection.query(InsertMyVocaQuery, [useridx, category_name, level_idx, voca_idx]);
            });
    
            if (!insertTransaction){
                res.status(200).send(util.successFalse(statusCode.DB_ERROR, resMessage.INSERT_WORD_MYVOCA_FAIL));
            }
            else;
            {
                console.log(CheckINMyvocaResult);
                res.status(200).send(util.successTrue(statusCode.OK, resMessage.INSERT_WORD_MYVOCA_SUCCESS));
            }  
    }}
    else{// request 인자 세게중 해당 voca_idx와 카테고리 레벨이 다르다면 에러
        res.status(200).send(util.successFalse(statusCode.BAD_REQUEST, resMessage.WORD_IS_NOT_IN_DB));
        }
});
    
module.exports = router;


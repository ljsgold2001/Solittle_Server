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

    const insertTransaction = await db.Transaction(async (connection) => {
    const InsertMyVocaQuery = "INSERT INTO myvoca (useridx , category_name , level_idx , voca_idx) VALUES(?, ?, ?, ?)"
    const insertMyVocaResult = await connection.query(InsertMyVocaQuery, [useridx, category_name, level_idx, voca_idx]);
    });
    //여기서 올바른지 안올바른지 확인해줘야하는 로직이 추가되어야 한다. 아니면 param의 값이 잘못되어도 추가됨
    //################################################################################
    if (insertTransaction == 0){
        res.status(200).send(util.successFalse(statusCode.DB_ERROR, resMessage.INSERT_WORD_MYVOCA_FAIL));
    }else;
    {
        res.status(200).send(util.successTrue(statusCode.OK, resMessage.INSERT_WORD_MYVOCA_SUCCESS));
    }


    
    


});
    
module.exports = router;


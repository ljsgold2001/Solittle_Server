module.exports = {//서버들끼리의 원활한 소통을 위해서 응답메세지를 통일
    NULL_VALUE: "필요한 값이 없습니다",
    OUT_OF_VALUE: "파라미터 값이 잘못되었습니다",
    ID_OR_PW_NULL_VALUE: "아이디/비밀번호 값이 없습니다.",
    CREATED_USER: "회원 가입 성공",
    DELETE_USER: "회원 탈퇴 성공",

    ALREADY_USER: "이미 회원입니다.",
    NO_USER: "존재하지 않는 회원입니다.",
    MISS_MATCH_PW: "비밀번호가 맞지 않습니다.",
    LOGIN_SUCCESS: "로그인 성공",
    LOGIN_FAIL: "로그인 실패",
    LOGOUT_SUCCESS: "로그아웃 성공",
    LOGOUT_FAIL: "로그아웃 실패",
    DB_ERROR:"db error",
    REFRESH_UPDATE_ERROR: 'refreshtoken DB등록 오류',
    NOT_CORRECT_REFRESH_TOKEN: 'refreshtoken이 만료되었습니다.',
    USER_INSERT_FAIL: 'user insert fail',
    SIGNUP_SUCCESS: '회원 가입 성공',
    SIGNUP_FAIL: '중복된 email이 존재합니다.',
    REFRESH_UPDATE_ERROR:'refresh update fail',
    EMPTY_TOKEN:'토큰이 없습니다.',
    EXPRIED_TOKEN:'만료된 토큰입니다.',
    INVALID_TOKEN:'잘못된 형식의 토큰입니다.',
    REFRESH_TOKEN:'토큰 발급 완료!',
    USER_DELETE_FAIL:'user 계정 삭제 실패',
    USER_DELETE_SUCCESS:'user 계정 삭제 성공!',
    
    GARDEN_SELECT_FAIL:"garden select fail",
    GARDEN_SUCCESS:"garden get 성공",
    GARDEN_FAIL:"garden get 실패",
    PLANT_SUCCESS:"plant 성공",
    PLANT_FAIL:"plant 실패",
    ALREADY_PLANT:"이미 심으셨습니다!",
    WRITE_DIARY:"일기를 써야 심을 수 있어요!",
    NEW_USER_FAIL:"새로운 유저 일기 등록 실패",
    NEW_USER_SUCCESS:"새로운 유저 일기 등록 성공",
    EXIST_USER_FAIL:"기존 유저 일기 등록 실패",
    EXIST_USER_SUCCESS:"기존 유저 일기 등록 성공",
    DIARY_GET_FAIL:"diary get fail",
    DIARY_GET_SUCCESS:"diary get success",
    ALREADY_WRITE:"이미 일기를 등록 하셨습니다!",
    UPDATE_DIARY_FAIL:"diary update fail",
    BALLOON_SELECT_FAIL:"balloon select fail",
    TREENUM_FAIL:"treeNum 가져오기 fail",
    GROSS_INSERT_SUCCESS:"잡초 심기 성공",
    GROSS_INSERT_FAIL:"잡초 심기 실패",
    DIARY_SAVE_SUCCESS:"diary 등록 성공!",
    DIARY_UPDATE_SUCCESS:"diary 수정 성공!",


    DIARY_DELETE_SUCCESS: "일기 삭제 성공",
    DIARY_DELETE_FAIL: "일기 삭제 실패",
    DIARY_SELECT_FAIL: "일기 조회 실패",
    DIARY_SELECT_SUCCESS: "일기 조회 성공",


    SEND_EMAIL_FAIL: "메일 전송 실패",
    SEND_EMAIL_SUCCESS:"메일 전송 성공",
    UNDEFINED_EMAIL: "저장된 이메일이 아닙니다.",
    UPDATE_PW_FAIL:'update password fail',

    //solittle

    //main
    GET_MAIN_SUCCESS : "메인화면 로드 성공",
    GET_MAIN_ERROR : "메인화면 로드 실패",

    //signin
    NOT_CORRECT_PWD : "비밀번호가 일치하지 않습니다.",
    CANNOT_FIND_USER : "유저정보가 없습니다.",

    //level
    GET_LEVEL_SUCCESS :"LEVEL 로드 성공",
    GET_LEVEL_FAIL :"LEVEL 로드 실패",


    //quiz
    GET_WORD_SUCCESS :"WORD 로드 성공",
    GET_WORD_FAIL : "WORD 로드 실패",

    //myvoca
    INSERT_WORD_MYVOCA_SUCCESS :"단어장 INSERT 성공",
    INSERT_WORD_MYVOCA_FAIL :"단어장 INSERT 실패",
    WORD_IS_NOT_IN_DB : "VOCA_IDX와 REQUEST 불일치",
    ALREADY_EXIST_IN_MYVOCA : "MYVOCA에 이미 존재합니다.",
    GET_MYVOCA_FAIL :"MYVOCA 로드 실패",
    GET_MYVOCA_SUCCESS :"MYVOCA 로드 성공",
    WRONG_CATEGORY_NAME : "존재하지 않는 카테고리"




    




};
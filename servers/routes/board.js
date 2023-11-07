const express = require('express');
const router = express.Router();
const getConnection = require('../db/db');

//게시판
router.get('/board', async (req, res) => {
    const con = await getConnection();
    const results = await con.query('select * from board_table_view');
    res.json({boards:results[0]});
    con.release();
});

//글 작성
router.post('/board', async (req, res) => {
    const con = await getConnection();
    await con.query(
        'INSERT INTO board_table(BOARD_SUBJECT, BOARD_WRITER, BOARD_CONTENT, INS_DATE) VALUES(?, ?, ?, now())',
        [req.body.BOARD_SUBJECT, req.body.BOARD_WRITER, req.body.BOARD_CONTENT],
        (error) => {
            if (error) {
                console.error('쿼리 오류:', error);
            } else {
                console.log('데이터베이스에 성공적으로 삽입되었습니다.');
            }
        }
    );
    const results = await con.query('SELECT * FROM board_table_view');
    res.json({boards:results[0]});
    con.release();
});

//글 보기
router.get('/board/:BOARD_SEQ', async (req, res) => {
    const BOARD_SEQ = req.params.BOARD_SEQ;
    const con = await getConnection();
    const result = await con.query(
        'SELECT * FROM board_table WHERE BOARD_SEQ = ?',
        [BOARD_SEQ],
        (error) => {
            if (error) {
                console.error('쿼리 오류:', error);
            } else {
                console.log('데이터베이스에 성공적으로 삽입되었습니다.');
            }
        }
    );
    res.json({boardView:result[0][0]});
    con.release();
});

//글 삭제
router.post('/board/delete', async (req, res) => {
    // console.log(req.body);
    const con = await getConnection();
    await con.query(
        'DELETE FROM board_table WHERE BOARD_SEQ = ?',
        [req.body.BOARD_SEQ],
        (error) => {
            if (error) {
                console.error('쿼리 오류:', error);
            } else {
                console.log('데이터베이스에서 성공적으로 삭제되었습니다.');
            }
        }
    );
    const results = await con.query('SELECT * FROM board_table_view');
    res.json({boards:results[0]});
    con.release();
});

module.exports = router;
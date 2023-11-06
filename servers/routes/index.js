const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: '0000',
    database: 'cs_test',
});

router.get('/', (req, res)=>res.json({username:'bryan~~~'}));

router.get('/group', (req, res)=>res.json({username:'dev group. bryan'}));

router.post('/input', (req, res)=> {
    //클라이언트에서 보낸 값
    console.log(req.body.username);
    //서버에서 보내는 값
    res.json({username:'test post end'});
});

router.get('/board', async (req, res) => {
    const con = await pool.getConnection();
    const results = await con.query('select * from board_table');
    res.json({boards:results[0]});
    con.release();
});

router.post('/board', async (req, res) => {
    const con = await pool.getConnection();
    await con.query(
        'INSERT INTO board_table(BOARD_SUBJECT, BOARD_CONTENT, INS_DATE) VALUES(?, ?, now())',
        [req.body.BOARD_SUBJECT, req.body.BOARD_CONTENT],
        (error) => {
            if (error) {
                console.error('쿼리 오류:', error);
            } else {
                console.log('데이터베이스에 성공적으로 삽입되었습니다.');
            }
        }
    );
    const results = await con.query('select * from board_table');
    res.json({boards:results[0]});
    con.release();
});

router.post('/board/delete', async (req, res) => {
    const con = await pool.getConnection();
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
    const results = await con.query('select * from board_table');
    res.json({boards:results[0]});
    con.release();
});

module.exports = router;
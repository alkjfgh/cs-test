import React from 'react';
import moment from 'moment';

function Board({ boards, handleBoardView, handleDelete }) {
    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th>게시글 번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>입력일시</th>
                    <th>삭제</th>
                </tr>
                </thead>
                <tbody>
                {boards.map((board) => (
                    <tr key={board.BOARD_SEQ}>
                        <td>{board.BOARD_SEQ}</td>
                        <td onClick={() => handleBoardView(board.BOARD_SEQ)}>
                            {board.BOARD_SUBJECT}
                        </td>
                        <td>{board.BOARD_WRITER}</td>
                        <td>{moment(board.INS_DATE).format('YYYY-MM-DD:HH-mm-ss')}</td>
                        <td>
                            <button onClick={() => handleDelete(board.BOARD_SEQ)} type="button">
                                삭제
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Board;
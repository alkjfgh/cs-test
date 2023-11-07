import React from 'react';
import moment from "moment/moment";

function BoardView({ boardView, handleMain }) {
    return (
        <div className="board-view-container">
            <ul>
                <li>게시글 번호: {boardView.BOARD_SEQ}</li>
                <li>작성자: {boardView.BOARD_WRITER}</li>
                <li>제목: {boardView.BOARD_SUBJECT}</li>
                <li>내용: {boardView.BOARD_CONTENT}</li>
                <li>입력일시: {moment(boardView.INS_DATE).format('YYYY-MM-DD:HH-mm-ss')}</li>
                <li onClick={handleMain}>Main</li>
            </ul>
        </div>
    );
}

export default BoardView;

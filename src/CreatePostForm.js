import React from 'react';

function CreatePostForm({
                            BOARD_WRITER,
                            BOARD_SUBJECT,
                            BOARD_CONTENT,
                            handleChange,
                            handleSubmit,
                            handleEnter,
                        }) {
    return (
        <form onSubmit={handleSubmit}>
            <label>
                작성자:
                <input
                    type="text"
                    name="BOARD_WRITER"
                    value={BOARD_WRITER}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                제목:
                <input
                    type="text"
                    name="BOARD_SUBJECT"
                    value={BOARD_SUBJECT}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                내용:
                <textarea
                    name="BOARD_CONTENT"
                    value={BOARD_CONTENT}
                    onChange={handleChange}
                    onKeyDown={handleEnter}
                />
            </label>
            <br />
            <button type="submit">게시글 작성</button>
        </form>
    );
}

export default CreatePostForm;
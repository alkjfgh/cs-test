import React from 'react';
import Board from './Board';
import CreatePostForm from './CreatePostForm';
import BoardView from './BoardView';
import './App.css';
import './css/boardView.css'
import axios from 'axios'
// import logo from './logo.svg';

class App extends React.Component {
    
    //생성자
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
            BOARD_WRITER: '',
            BOARD_SUBJECT: '',
            BOARD_CONTENT: '',
            boardView: null,
        };
    }

    //state 초기화
    initState = () => {
      this.setState({
          boards: [],
          BOARD_WRITER: '',
          BOARD_SUBJECT: '',
          BOARD_CONTENT: '',
          boardView: null,
      });
    };

    //페이지 로딩전 값 가져오기
    componentDidMount() {
      fetch('api/board')
          .then(res=>res.json())
          .then(data=>this.setState({ boards: data.boards,boardView: null }));
    };

    //input 값 가져오기
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    //submit
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.isInputEmpty()){
            const data = {
                BOARD_WRITER: this.state.BOARD_WRITER,
                BOARD_SUBJECT: this.state.BOARD_SUBJECT,
                BOARD_CONTENT: this.state.BOARD_CONTENT
            };
            this.setState({BOARD_WRITER: '', BOARD_SUBJECT: '', BOARD_CONTENT: ''});
            axios.post('api/board', data)
                .then(response => {
                    this.initState();
                    this.setState({ boards: response.data.boards });
                })
                .catch(error => {
                    console.error('POST 요청 에러:', error);
                });
        }
    };

    //delete
    handleDelete = (seq) => {
        // e.preventDefault();
        const data = { BOARD_SEQ: seq};
        axios.post('api/board/delete', data)
            .then(response => {
                this.initState();
                this.setState({ boards: response.data.boards });
            })
            .catch(error => {
                console.error('POST 요청 에러:', error);
            });
    };

    //enter event
    handleEnter = (e) => {
        if(e.code === 'Enter' && this.isInputEmpty()) this.handleSubmit(e);
    }

    //글 보기
    handleBoardView = (seq) => {
        axios.get('api/board/'+seq)
            .then(response => {
                this.initState();
                this.setState({ boardView: response.data.boardView });
            })
            .catch(error => {
                console.error('GET 요청 에러:', error);
            });
    }

    //메인 이동
    handleMain = () => {
        axios.get('api/board')
            .then(response => {
                this.initState();
                this.setState({ boards: response.data.boards });
            })
            .catch(error => {
                console.error('GET 요청 에러:', error);
            });
    }

    //input 비어있는지 체크
    isInputEmpty = () => {
        return this.state.BOARD_WRITER!=='' && this.state.BOARD_SUBJECT!=='' && this.state.BOARD_CONTENT!=='';
    }

    render() {
        const {boards, boardView} = this.state;
        return (
            <div className="App">
                <h1>게시판</h1>
                
                {/*글 목록*/}
                {boards.length > 0 && <Board boards={boards} handleBoardView={this.handleBoardView} handleDelete={this.handleDelete} />}

                {/*글 작성*/}
                {boardView == null  && (
                    <CreatePostForm
                        BOARD_WRITER={this.state.BOARD_WRITER}
                        BOARD_SUBJECT={this.state.BOARD_SUBJECT}
                        BOARD_CONTENT={this.state.BOARD_CONTENT}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        handleEnter={this.handleEnter}
                    />
                )}
    
                {/*글 보기*/}
                {boardView != null && <BoardView boardView={boardView} handleMain={this.handleMain} />}
            </div>
        );
      }
}

export default App;
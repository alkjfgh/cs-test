import React from 'react';
import Board from './Board';
import CreatePostForm from './CreatePostForm';
import BoardView from './BoardView';
import './App.css';
import './css/boardView.css'
import axios from 'axios'
// import logo from './logo.svg';

class App extends React.Component {
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

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

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
                    // this.setState({ boardView: null });
                })
                .catch(error => {
                    console.error('POST 요청 에러:', error);
                });
        }
    };

    handleDelete = (seq) => {
        // e.preventDefault();
        const data = { BOARD_SEQ: seq};
        axios.post('api/board/delete', data)
            .then(response => {
                this.initState();
                this.setState({ boards: response.data.boards });
                // this.setState({ boardView: null });
            })
            .catch(error => {
                console.error('POST 요청 에러:', error);
            });
    };

    isInputEmpty = () => {
        return this.state.BOARD_WRITER!=='' && this.state.BOARD_SUBJECT!=='' && this.state.BOARD_CONTENT!=='';
    }

    handleEnter = (e) => {
        if(e.code === 'Enter' && this.isInputEmpty()) this.handleSubmit(e);
    }

    handleBoardView = (seq) => {
        axios.get('api/board/'+seq)
            .then(response => {
                this.initState();
                this.setState({ boardView: response.data.boardView });
                // this.setState({ boards: [] });
            })
            .catch(error => {
                console.error('GET 요청 에러:', error);
            });
    }

    handleMain = () => {
        axios.get('api/board')
            .then(response => {
                this.initState();
                this.setState({ boards: response.data.boards });
                // this.setState({ boardView: null });
            })
            .catch(error => {
                console.error('GET 요청 에러:', error);
            });
    }

  render() {
    const {boards, boardView} = this.state;
    return (
        <div className="App">
            <h1>게시판</h1>
            {boards.length > 0 && <Board boards={boards} handleBoardView={this.handleBoardView} handleDelete={this.handleDelete} />}

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

            {boardView != null && <BoardView boardView={boardView} handleMain={this.handleMain} />}
        </div>
    );
  }
}

export default App;
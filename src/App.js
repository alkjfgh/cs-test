import React from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        boards: [],
        BOARD_SUBJECT: '',
        BOARD_CONTENT: '',
      // username:null,
    };
  }

  //페이지 로딩전 값 가져오기
  componentDidMount() {
      // fetch('api/group')
      //     .then(res=>res.json())
      //     .then(data=>this.setState({username:data.username}
      fetch('api/board')
          .then(res=>res.json())
          .then(data=>this.setState({ boards: data.boards }));
  }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const data = { BOARD_SUBJECT: this.state.BOARD_SUBJECT, BOARD_CONTENT: this.state.BOARD_CONTENT};
        this.setState({BOARD_SUBJECT: '', BOARD_CONTENT: ''});
        axios.post('api/board', data)
            .then(response => {
                this.setState({ boards: response.data.boards });
            })
            .catch(error => {
                console.error('POST 요청 에러:', error);
            });
    };

    handleDelete = (e) => {
        e.preventDefault();
        const data = { BOARD_SEQ: e.target.value};
        axios.post('api/board/delete', data)
            .then(response => {
                this.setState({ boards: response.data.boards });
            })
            .catch(error => {
                console.error('POST 요청 에러:', error);
            });
    };

  //인풋 변경 핸들
  handleInputChange = (event) => {
      this.setState({ username: event.target.value });
  }

  //포스트 요청 핸들
  handlePostRequest = () => {
    // 데이터 객체를 POST 요청에 포함시킬 수 있습니다.
    const data = { username: this.state.username};

    axios.post('api/input', data)
        .then(response => {
            console.log('POST 요청 응답:', response.data);
            this.setState({username:response.data.username});
        })
        .catch(error => {
            console.error('POST 요청 에러:', error);
        });
  }

  handleBoardRequest = async () => {
    axios.get('api/board')
        .then(response => {
            console.log('board 요청 응답:', response.data.boards);
            this.setState({ boards: response.data.boards });
        })
        .catch(error => {
            console.error('board 요청 에러:', error);
        });
  }

  render() {
      const {boards} = this.state;
    return (
        <div className="App">
            <h1>게시판</h1>
            {/*{username ? `Hello ${username}` : 'Hello World'}*/}
            {/*<input type="text" value={this.state.username} onChange={this.handleInputChange}/>*/}
            {/*<button onClick={this.handlePostRequest}>Post test</button>*/}
            {/*<button onClick={this.handleBoardRequest}>board</button>*/}
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>게시글 번호</th>
                        <th>제목</th>
                        <th>내용</th>
                        <th>입력일시</th>
                        <th>삭제</th>
                    </tr>
                    </thead>
                    <tbody>
                    {boards.map((board) => (
                        <tr key={board.BOARD_SEQ}>
                            <td>{board.BOARD_SEQ}</td>
                            <td>{board.BOARD_SUBJECT}</td>
                            <td>{board.BOARD_CONTENT}</td>
                            <td>{board.INS_DATE}</td>
                            <td><button onClick={this.handleDelete} type="button" value={board.BOARD_SEQ}>삭제</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <form onSubmit={this.handleSubmit}>
                <label>
                    제목:
                    <input
                        type="text"
                        name="BOARD_SUBJECT"
                        value={this.state.BOARD_SUBJECT}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <label>
                    내용:
                    <textarea
                        name="BOARD_CONTENT"
                        value={this.state.BOARD_CONTENT}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <button type="submit">게시글 작성</button>
            </form>
        </div>
    );
  }
}

export default App;
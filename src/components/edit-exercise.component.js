import React, { Component } from 'react';
import axios from 'axios';

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
    this.onChangeDifficulty = this.onChangeDifficulty.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onChangeCorrectAnswer = this.onChangeCorrectAnswer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      categoryName: '',
      difficulty: '',
      question: '',
      correctAnswer: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          categoryName: response.data.categoryName,
          difficulty: response.data.difficulty,
          question: response.data.question,
          correctAnswer: response.data.correctAnswer,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeCategoryName(e) {
    this.setState({
      categoryName: e.target.value
    })
  }

  onChangeDifficulty(e) {
    this.setState({
      difficulty: e.target.value
    })
  }

  onChangeQuestion(e) {
    this.setState({
      question: e.target.value
    })
  }

  onChangeCorrectAnswer(e) {
    this.setState({
      correctAnswer: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      categoryName: this.state.categoryName,
      difficulty: this.state.difficulty,
      question: this.state.question,
      correctAnswer: this.state.correctAnswer,
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Category Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.categoryName}
              onChange={this.onChangeCategoryName}
              />
        </div>
        <div className="form-group">
          <label>Difficulty: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.difficulty}
              onChange={this.onChangeDifficulty}
              />
        </div>
        <div className="form-group">
          <label>Question: </label>
          <input
              type="text" 
              className="form-control"
              value={this.state.question}
              onChange={this.onChangeQuestion}
            />
        </div>
        <div className="form-group">
          <label>Correct Answer: </label>
          <input
              type="text" 
              className="form-control"
              value={this.state.correctAnswer}
              onChange={this.onChangeCorrectAnswer}
            />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
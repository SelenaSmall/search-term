import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import API from '../API'

class Round extends Component {
  constructor(props) {
    super(props);
    const round = parseInt(props.match.params.round)
    this.state = { term: null, round: round, images: [], status: 'LOADING ...', secondsRemaining: 10, score: null }
    this.fetchRoundData()
    this.handleGuess = this.handleGuess.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.tick = this.tick.bind(this)
  }

  // TODO - shouldnt use this beacuse its unsafe
  componentWillReceiveProps(props) {
    const round = parseInt(props.match.params.round)
    this.setState({round: round})
    this.fetchRoundData()
  }

  fetchRoundData() {
    const { round } = this.state;
    API.fetchRoundData(round).then((data) => {
      this.setState(data)
      this.setState({status: 'IN-PROGRESS'})
      this.startTimer()
    })
  }

  startTimer() {
    this.intervalHandle = setInterval(this.tick, 1000)
  }

  tick() {
    if (this.state.secondsRemaining <= 0 ) {
      clearInterval(this.intervalHandle)
      // TODO - new intervalHandle seems to be created for each round
    } else {
      this.setState({secondsRemaining: this.state.secondsRemaining - 1})
    }
  }

  handleGuess(event) {
    if(event.target.value === this.state.term) {
      this.setState({status: 'WINNER'})
      clearInterval(this.intervalHandle)
      this.setState({score: this.state.secondsRemaining})
    }
  }

  render() {
    return(
      <div>
        <Link to="/">Start Game</Link>
        <h3>Round <span className="round">{this.state.round}</span></h3>
        <span className="timer">{this.state.secondsRemaining}</span>
        <span className="score">{this.state.score}</span>
        <span className="status">{this.state.status}</span>
        <div>
          { this.state.images.map( ({id, src}) => (<img className="image" key={id} src={src} alt="nice try"/>))}
        </div>
        <div>
          <input className="guess" onChange={this.handleGuess }></input>
        </div>
        <Link to={`/round/${this.state.round + 1}`} className="next-round">Next round</Link>
      </div>
    )
  }
}

export default Round
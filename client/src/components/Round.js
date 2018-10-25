import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import API from '../API'

class Round extends Component {
  constructor(props) {
    super(props);
    const round = parseInt(props.match.params.round)
    this.state = { term: null, round: round, images: [], status: 'LOADING ...', secondsRemaining: 10, score: null, interval: null }
    this.fetchRoundData()
    this.handleGuess = this.handleGuess.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.tick = this.tick.bind(this)
  }

  componentWillReceiveProps(props) {
    clearInterval(this.state.interval)
    const round = parseInt(props.match.params.round)
    this.setState({round: round, secondsRemaining: 10})
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

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  startTimer() {
    const interval = setInterval(this.tick, 1000);
    this.setState({interval: interval })
  }

  tick() {
    if (this.state.secondsRemaining <= 0 ) {
      clearInterval(this.state.interval)
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
        {
          this.state.round >= 20 ?
            <Link to="/results" className="next-round">Next</Link> :
            <Link to={`/round/${this.state.round + 1}`} className="next-round">Next</Link>
        }
      </div>
    )
  }
}

export default Round
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap';
import API from '../API'
import './game.css';

class Round extends Component {
  constructor(props) {
    super(props);
    const round = parseInt(props.match.params.round, 10)
    this.state = { term: null, round: round, images: [], status: 'LOADING ...', secondsRemaining: 10, score: 0, interval: null }
    this.fetchRoundData()
    this.fetchGameData()
    this.handleGuess = this.handleGuess.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.tick = this.tick.bind(this)
  }

  componentWillReceiveProps(props) {
    clearInterval(this.state.interval)
    const round = parseInt(props.match.params.round, 10)
    this.setState({round: round, secondsRemaining: 10, guess: ''})
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

  fetchGameData() {
    API.fetchGameData().then((data) => {
      this.setState({maxRounds: data.rounds})
    })
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
    this.setState({guess: event.target.value})
    if(event.target.value.split(/[\s\n]/).find((word) => (word === this.state.term))) {
      this.setState({status: 'WINNER'})
      clearInterval(this.state.interval)
      this.setState({score: this.state.score + this.state.secondsRemaining})
    }
  }

  render() {
    return(
      <div>
        <section id="top-region">
          <menu className="status-menu">
            <ul>
              <li className="status-menu-item status">
                <span className="status-menu-item-label">Status</span>
                <span className="status-menu-item-value">{this.state.status}</span>
              </li>
              <li className="status-menu-item score">
                <span className="status-menu-item-label">Score</span>
                <span className="status-menu-item-value">{this.state.score}</span>
              </li>
              <li className="status-menu-item timer">
                <span className="status-menu-item-label">Time</span>
                <span className="status-menu-item-value">{this.state.secondsRemaining}</span>
              </li>
            </ul>
          </menu>
        </section>

        <section id="middle-region">
          <h1 className="text-center">Round <span className="round">{this.state.round}</span></h1>

          <Row className="main-container-row">
            <Col sm="6">
              <div className="images-container">
                { this.state.images.map( ({id, src}) => (
                  <div className="images-container-single" key={id}>
                    <img className="images-container-single-image" key={id} src={src} alt="nice try"/>
                  </div>
                ))}
              </div>
            </Col>

            <Col sm="6">
              <div className="input-container">
                <h5>Guess the search term</h5>
                <textarea
                  className="input-container-guess"
                  onChange={this.handleGuess }
                  value={this.state.guess}
                  disabled={this.state.status === 'WINNER'}></textarea>

                {
                  this.state.round >= this.state.maxRounds ?
                    <Link to={{ pathname: '/results', state: { score: this.state.score } }} className="input-container-next-round next-round game-button">Next</Link> :
                    <Link to={`/round/${this.state.round + 1}`} className="input-container-next-round next-round game-button">Next</Link>
                }
              </div>
            </Col>
          </Row>
        </section>

        <section id="bottom-region">
          <menu className="twitter-menu">
            <ul>
              <li className="twitter-menu-item twitter-menu-item-left status">
                <a href="http://twitter.com/intent/user?screen_name=selenasmall88">
                  <img className="twitter-menu-item-avatar" src="https://twitter.com/selenasmall88/profile_image?size=normal" alt="selena-small"></img>
                  <span>@selenasmall88</span>
                </a>
              </li>
              <li className="twitter-menu-item status">
                <a href="http://twitter.com/intent/user?screen_name=saramic">
                  <img className="twitter-menu-item-avatar" src="https://twitter.com/saramic/profile_image?size=normal" alt="michael-milewski"></img>
                  <span>@saramic</span>
                </a>
              </li>
            </ul>
          </menu>
        </section>
      </div>
    )
  }
}

export default Round

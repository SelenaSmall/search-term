import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap';
import API from '../API'
import './game.css';

class Round extends Component {
  constructor(props) {
    super(props);
    const round = parseInt(props.match.params.round, 10)
    this.state = { term: null, round: round, images: [], status: 'LOADING ...', secondsRemaining: 60, score: 0, interval: null }
    this.fetchRoundData(round)
    this.fetchGameData()
    this.guessInputRef = React.createRef()
    this.nextButtonRef = React.createRef()
    this.handleGuess = this.handleGuess.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.tick = this.tick.bind(this)
  }

  componentWillReceiveProps(props) {
    clearInterval(this.state.interval)
    const round = parseInt(props.match.params.round, 10)
    this.setState({round: round, secondsRemaining: 60, guess: ''})
    this.fetchRoundData(round)
  }

  fetchRoundData(round) {
    this.setState({status: 'LOADING ...', images: []})
    API.fetchRoundData(round).then((data) => {
      this.setState(data)
      this.setState({status: 'IN-PROGRESS'})
      this.startTimer()
      this.guessInputRef.current.focus()
    }).catch((error) => {
      this.setState({status: 'ERROR'})
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
    const REGEX = new RegExp(this.state.term)
    if(REGEX.exec(event.target.value)) {
      this.setState({status: 'WINNER'})
      clearInterval(this.state.interval)
      this.setState({score: this.state.score + this.state.secondsRemaining})
      this.nextButtonRef.current.focus()
    }
  }

  componentDidMount() {
    // this.guessInputRef.current.focus(); // TODO breaks tests
  }

  render() {
    return(
      <div className="flex flex-column">
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
                  { this.state.status === 'LOADING ...' ?
                    <div className="background" /> :
                    this.state.images.map( ({id, src}) => (
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
                  ref={this.guessInputRef}
                  className="input-container-guess"
                  onChange={this.handleGuess }
                  value={this.state.guess}
                  disabled={this.state.status === 'WINNER'}></textarea>

                {
                  this.state.round >= this.state.maxRounds ?
                    <Link innerRef={this.nextButtonRef} to={{ pathname: '/results', state: { score: this.state.score } }} className="input-container-next-round next-round game-button">Next</Link> :
                    <Link innerRef={this.nextButtonRef} to={`/round/${this.state.round + 1}`} className="input-container-next-round next-round game-button">Next</Link>
                }
              </div>
            </Col>
          </Row>
        </section>

        <section id="bottom-region" className="md:fixed">
          <menu className="twitter-menu">
            <ul>
              <li className="twitter-menu-item twitter-menu-item-left status">
                <a href="http://twitter.com/intent/user?screen_name=selenasmall88">
                  <img className="twitter-menu-item-avatar" src="/avatar-selena.jpg" alt="selena-small"></img>
                  <span>@selenasmall88</span>
                </a>
              </li>
              <li className="twitter-menu-item status">
                <a href="http://twitter.com/intent/user?screen_name=saramic">
                  <img className="twitter-menu-item-avatar" src="/avatar-michael.jpg" alt="michael-milewski"></img>
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

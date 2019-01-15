import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import API from '../API';
import './game.css';
import Header from './Header';

class Round extends Component {
  constructor(props) {
    super(props);
    const round = parseInt(props.match.params.round, 10);
    const gameName = props.match.params.gameName;
    this.state = {
      term: null,
      round,
      images: [],
      // status: 'IN-PROGRESS',
      status: 'LOADING ...', // TODO live fix
      secondsRemaining: 0,
      score: 0,
      interval: null,
      gameName,
      terms: [],
    };
    this.fetchGameData(gameName);
    const { gameStyle } = this.state;
    this.fetchRoundData(round, gameName, gameStyle);
    this.guessInputRef = React.createRef();
    this.nextButtonRef = React.createRef();
    this.handleGuess = this.handleGuess.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.tick = this.tick.bind(this);
    this.timeIsUp = this.timeIsUp.bind(this);
  }

  componentDidMount() {
    // this.guessInputRef.current.focus(); // TODO breaks tests
  }

  componentWillReceiveProps(props) {
    const { interval } = this.state;
    clearInterval(interval);
    const round = parseInt(props.match.params.round, 10);
    const gameName = props.match.params.gameName;
    this.setState({ round, secondsRemaining: 60, guess: '', gameName });
    this.fetchRoundData(round, gameName);
  }

  fetchRoundData(round, gameName, gameStyle) {
    API.fetchRoundData(round, gameName).then((data) => {
      this.setState(data);
      this.setState({ status: 'IN-PROGRESS' }); // TODO live fix
      this.startTimer();
      if (gameStyle === 'text') {
        this.guessInputRef.current.focus();
      }
    }).catch(() => {
      this.setState({ status: 'ERROR' });
    });
  }

  fetchGameData(gameId) {
    API.fetchGameData(gameId).then((data) => {
      this.setState({ maxRounds: data.rounds, gameStyle: data.game_style, secondsRemaining: data.seconds_per_round });
    });
  }

  startTimer() {
    const interval = setInterval(this.tick, 1000);
    this.setState({ interval });
  }

  tick() {
    const { secondsRemaining } = this.state;
    if (secondsRemaining <= 0) {
      this.timeIsUp();
    } else {
      (secondsRemaining);
      this.setState({ secondsRemaining: secondsRemaining - 1 })
    }
  }

  timeIsUp() {
    const { interval } = this.state;
    clearInterval(interval);
    this.setState({ status: 'TIME-IS-UP' });
  }

  handleGuess(event) {
    const { value } = event.target;
    const {
      term, interval, score, secondsRemaining, gameStyle,
    } = this.state;
    this.setState({ guess: value });
    const REGEX = new RegExp(term);
    if (REGEX.exec(value)) {
      this.setState({ status: 'WINNER' });
      clearInterval(interval);
      this.setState({ score: score + secondsRemaining });
      this.nextButtonRef.current && this.nextButtonRef.current.focus();
    } else {
      this.setState({ status: 'WRONG' });
      if (gameStyle === 'multi_choice') {
        clearInterval(interval);
        this.setState({ score: score + secondsRemaining });
        this.nextButtonRef.current && this.nextButtonRef.current.focus();
      }
    }
  }

  render() {
    const {
      status, score, secondsRemaining, round, maxRounds, images, guess, gameName, gameStyle, terms,
    } = this.state;

    const choices = terms.map( term => <li><button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded min-w-full mb-1" onClick={this.handleGuess} value={term} key={term}>{term}</button></li> );

    return (
      <div className="flex flex-column">
        <Header
          status={status}
          score={score}
          secondsRemaining={secondsRemaining}
        />

        <section id="middle-region">
          <h1 className="text-center">
Round
            <span className="round">{round}</span>
          </h1>

          <Row className="main-container-row">
            <Col sm="6">
              <div className="images-container">
                { status === 'LOADING ...'
                  ? <div className="background" />
                  : images.map(({ id, src }) => (
                    <div className="images-container-single" key={id}>
                      <img className="images-container-single-image" key={id} src={src} alt="nice try" />
                    </div>
                  ))}
              </div>
            </Col>

            <Col sm="6">
              <div className="input-container">
                <h5>Guess the search term</h5>
                {
                  gameStyle === 'text'
                    ? <textarea
                        ref={this.guessInputRef}
                        className="input-container-guess"
                        onChange={this.handleGuess}
                        value={guess}
                        disabled={status === 'WINNER'}
                      />
                    : <ul class="list-reset">{choices}</ul>
                }

                {
                  round >= maxRounds
                    ? <Link to={{ pathname: '/results', state: { score } }} className="input-container-next-round next-round game-button">Next</Link>
                    : <Link to={`/game/${gameName}/round/${round + 1}`} className="input-container-next-round next-round game-button">Next</Link>
                }
              </div>
            </Col>
          </Row>
        </section>
      </div>
    );
  }
}

export default Round;

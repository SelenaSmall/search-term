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
      term: null, round, images: [], status: 'LOADING ...', secondsRemaining: 60, score: 0, interval: null, gameName, terms: [],
    };
    this.fetchGameData(gameName);
    const { gameStyle } = this.state;
    this.fetchRoundData(round, gameName, gameStyle);
    this.guessInputRef = React.createRef();
    this.nextButtonRef = React.createRef();
    this.handleGuess = this.handleGuess.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.tick = this.tick.bind(this);
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
    // TODO: warning around setting state
    // setState on a component that is not yet mounted
    // Instead, assign to `this.state` directly or define a `state = {};
    this.setState({ status: 'LOADING ...', images: [] });
    API.fetchRoundData(round, gameName).then((data) => {
      this.setState(data);
      this.setState({ status: 'IN-PROGRESS' });
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
      this.setState({ maxRounds: data.rounds, gameStyle: data.game_style });
    });
  }

  startTimer() {
    const interval = setInterval(this.tick, 1000);
    this.setState({ interval });
  }

  tick() {
    const { secondsRemaining, interval } = this.state;
    if (secondsRemaining <= 0) {
      clearInterval(interval);
    } else {
      this.setState({ secondsRemaining: secondsRemaining - 1 });
    }
  }

  handleGuess(event) {
    const { value } = event.target;
    const {
      term, interval, score, secondsRemaining,
    } = this.state;
    this.setState({ guess: value });
    const REGEX = new RegExp(term);
    if (REGEX.exec(value)) {
      this.setState({ status: 'WINNER' });
      clearInterval(interval);
      this.setState({ score: score + secondsRemaining });
      this.nextButtonRef.current.focus();
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

                {/* TODO: below is a warning Failed prop type: Invalid prop `innerRef` supplied to `Link`.*/}
                {
                  round >= maxRounds
                    ? <Link innerRef={this.nextButtonRef} to={{ pathname: '/results', state: { score } }} className="input-container-next-round next-round game-button">Next</Link>
                    : <Link innerRef={this.nextButtonRef} to={`/game/${gameName}/round/${round + 1}`} className="input-container-next-round next-round game-button">Next</Link>
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

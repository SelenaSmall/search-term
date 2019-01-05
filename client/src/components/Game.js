import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../API';
import './game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { games: [] };
    this.fetchGamesData();
  }

  fetchGamesData() {
    API.fetchGamesData().then((data) => {
      this.setState({ games: data.games });
    });
  }

  render() {
    const games = this.state.games.map( (game) =>
      <Link key={game.id} to={`/game/${game.id}/round/1`} className="game-button start-game-button">Start Game</Link>
    );

    return (
      <div>
        <section id="middle-region">
          <div className="game-main-container text-center">
            <div>
              <h1>Welcome to the Game</h1>

              {games}

            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Game;

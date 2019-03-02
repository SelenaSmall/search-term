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
    const { games } = this.state;

    return (
      <div>
        <section id="middle-region">
          <div className="game-main-container text-center">
            <div>
              <h1>Welcome to the Game</h1>

              <div className="px-2">
                <div className="flex -mx-2">
                  {games.map(game => (
                    <div key={game.id} className="flex-1 w-1/2 px-2">
                      <div className="max-w-sm rounded overflow-hidden shadow-lg m-auto">
                        <img
                          className="w-full"
                          src={game.featured_image_url}
                          alt="Sunset in the mountains"
                        />
                        <div className="px-6 py-4">
                          <div className="game-title font-bold text-xl mb-2">
                            {game.title}
                          </div>
                          <p className="text-grey-darker text-base">
                            <Link
                              key={game.id}
                              to={`/game/${game.id}/pre-round`}
                              className="game-button start-game-button"
                            >
                              Start Game
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Game;

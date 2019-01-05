import React from 'react';
import { Link } from 'react-router-dom';
import './game.css';

const Game = () => (
  <div>
    <section id="middle-region">
      <div className="game-main-container text-center">
        <div>
          <h1>Welcome to the Game</h1>
          <Link to="/game/1/round/1" className="game-button start-game-button" gameId="1">Start Game</Link>
        </div>
      </div>
    </section>
  </div>
);

export default Game;

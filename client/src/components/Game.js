import React from 'react'
import {
  Jumbotron,
} from 'reactstrap';
import { Link } from 'react-router-dom'
import './game.css';

const Game = () => (
    <div>
      <Jumbotron className="text-center welcome-page">
        <h3 className="display-3">Welcome to the Game</h3>
          <div className="start-game-container">
            <Link to="/round/1" className="game-button">Start Game</Link>
          </div>
      </Jumbotron>
    </div>
)

export default Game
import React from 'react'
import { Link } from 'react-router-dom'
import './game.css';
import Footer from './Footer';

const Game = () => (
    <div>
      <section id="top-region">
        <menu className="status-menu">
          <ul>
            <li className="status-menu-item status">
              <span className="status-menu-item-label">Status</span>
              <span className="status-menu-item-value"></span>
            </li>
            <li className="status-menu-item score">
              <span className="status-menu-item-label">Score</span>
              <span className="status-menu-item-value"></span>
            </li>
            <li className="status-menu-item timer">
              <span className="status-menu-item-label">Time</span>
              <span className="status-menu-item-value"></span>
            </li>
          </ul>
        </menu>
      </section>

      <section id="middle-region">
        <div className="game-main-container text-center">
          <div>
            <h1>Welcome to the Game</h1>
            <Link to="/round/1" className="game-button start-game-button">Start Game</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
)

export default Game
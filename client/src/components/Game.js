import React from 'react'
import { Link } from 'react-router-dom'
import './game.css';
import Header from './Header';
import Footer from './Footer';

const Game = () => (
    <div>
      <Header />

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
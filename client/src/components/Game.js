import React from 'react'
import { Card, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom'
import './game.css';

const Game = () => (
    <div>
      <Jumbotron className="text-center welcome-page">
          <h1 className="display-3">Welcome to the Game</h1>
          <p className="lead">With supporting text below as a natural lead-in to additional content.</p>

          <Card body className="text-center welcome-card">
            <Link to="/round/1" className="start-button">Start Game</Link>
          </Card>
      </Jumbotron>
    </div>
)

export default Game
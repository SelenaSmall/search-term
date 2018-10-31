import React from 'react'
import {Link } from 'react-router-dom'

const Results = ({location: { state: { score }} }) => (
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
        <h1 className="congratulations">Congratulations!</h1>
        <h2 className="final-score">You scored {score}</h2>

        <Link to="/" className="game-button">Home</Link>
        </div>
      </div>
    </section>

    <section id="bottom-region">
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

export default Results
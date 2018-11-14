import React from 'react'
import {Link } from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';

const Results = ({location: { state: { score }} }) => (
  <div>
    <Header />

    <section id="middle-region">
      <div className="game-main-container text-center">
        <div>
        <h1 className="congratulations">Congratulations!</h1>
        <h2 className="final-score">You scored {score}</h2>

        <Link to="/" className="game-button">Home</Link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
)

export default Results